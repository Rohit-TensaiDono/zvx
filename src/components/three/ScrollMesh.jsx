'use client';
/**
 * ScrollMesh — ZenVoraX neural particle field
 *
 * Architecture (why it's fast):
 * - 420 particles — sweet spot between density and GPU cost
 * - AdditiveBlending — particles glow on overlap, zero alpha-sort overhead
 * - Static line geometry — computed once at init, never re-uploaded
 * - Mouse repulsion + spring — plain JS, ~420 cheap float ops/frame
 * - Click ripple — expanding ring equation, no extra geometry
 * - Scroll progress read inside RAF — ZERO scroll event listener = ZERO jank
 *
 * Interactions:
 *   Mouse move → particles within radius scatter and spring back
 *   Click / Tap → ripple ring expands from click point
 *   Scroll → mesh expands through 4 narrative stages
 */
import { useEffect, useRef } from 'react';

const lerp = (a, b, t) => a + (b - a) * t;

export default function ScrollMesh() {
  const mountRef = useRef(null);

  useEffect(() => {
    let THREE, renderer, scene, camera, pGeo, pointMesh, lineMesh, pMat, lMat;
    let animId;
    const origPos = []; // spring target positions
    const mouse3D  = { x: 0, y: 0 };
    let lerpSpread = 1, lerpOp = 0.72;

    // Ripple state
    let rippleT = -99, rippleX = 0, rippleY = 0;

    /* ── helpers ────────────────────────────────────── */
    function unprojectMouse(clientX, clientY) {
      if (!camera) return;
      const nx = (clientX / window.innerWidth)  *  2 - 1;
      const ny = (clientY / window.innerHeight) * -2 + 1;
      const v = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const t = (0 - camera.position.z) / dir.z; // intersect z=0 plane
      const p = camera.position.clone().add(dir.multiplyScalar(t));
      mouse3D.x = p.x; mouse3D.y = p.y;
    }

    async function init() {
      THREE = await import('three');
      const W = window.innerWidth, H = window.innerHeight;

      /* Scene & Camera */
      scene  = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 100);
      camera.position.z = 4.8;

      /* Renderer — fixed canvas behind everything */
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      Object.assign(renderer.domElement.style, {
        position: 'fixed', inset: '0',
        zIndex: '0', pointerEvents: 'none',
      });
      mountRef.current?.appendChild(renderer.domElement);

      /* ── Particle cloud ─────────────────────────── */
      const COUNT = 420;
      const pos   = new Float32Array(COUNT * 3);
      const col   = new Float32Array(COUNT * 3);
      const sizes = new Float32Array(COUNT);

      // Palette — 50% gold, 25% red-orange, 25% blue/cyan
      const palette = [
        new THREE.Color('#F0C85A'), new THREE.Color('#F0C85A'),
        new THREE.Color('#D43C2F'),
        new THREE.Color('#3BAAFF'), new THREE.Color('#00D4FF'),
      ];

      const pts = [];
      for (let i = 0; i < COUNT; i++) {
        // Spherical distribution for more even 3D spread
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 3 + Math.random() * 4; // 3..7 units out
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.7;
        const z = r * Math.cos(phi) * 0.6;

        pos[i*3]=x; pos[i*3+1]=y; pos[i*3+2]=z;
        origPos.push(x, y, z); // spring targets
        pts.push(new THREE.Vector3(x, y, z));

        const c = palette[Math.floor(Math.random() * palette.length)];
        col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;

        // Vary size for depth illusion
        sizes[i] = 0.018 + Math.random() * 0.016;
      }

      pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos,   3));
      pGeo.setAttribute('color',    new THREE.BufferAttribute(col,   3));

      pMat = new THREE.PointsMaterial({
        size: 0.028,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending, // ← glow effect
        depthWrite: false,                // ← required with additive
        sizeAttenuation: true,
      });
      pointMesh = new THREE.Points(pGeo, pMat);
      scene.add(pointMesh);

      /* ── Neural connections (static) ─────────────── */
      const linePos = [], lineCol = [];
      const LINK = 1.8;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const d = pts[i].distanceTo(pts[j]);
          if (d < LINK) {
            linePos.push(pts[i].x, pts[i].y, pts[i].z,
                         pts[j].x, pts[j].y, pts[j].z);
            // Color lerps from gold → blue along connection
            const f = Math.random();
            lineCol.push(0.94, 0.78, 0.35,  // gold
                         0.23 + f*0.77, 0.67 + f*0.2, f); // → blue
          }
        }
      }
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3));
      lGeo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(lineCol), 3));
      lMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.10,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      lineMesh = new THREE.LineSegments(lGeo, lMat);
      scene.add(lineMesh);

      /* ── Events ──────────────────────────────────── */
      // Store raw mouse — unproject happens in RAF to stay off main thread
      let rawMX = 0, rawMY = 0;
      const onMouse = (e) => { rawMX = e.clientX; rawMY = e.clientY; };
      const onTouch = (e) => {
        if (!e.touches[0]) return;
        rawMX = e.touches[0].clientX; rawMY = e.touches[0].clientY;
      };
      const onClick = (e) => {
        unprojectMouse(e.clientX, e.clientY);
        rippleX = mouse3D.x; rippleY = mouse3D.y;
        rippleT = clock.getElapsedTime();
      };
      window.addEventListener('mousemove', onMouse, { passive: true });
      window.addEventListener('touchmove',  onTouch, { passive: true });
      window.addEventListener('click', onClick);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      /* ── Animation loop ──────────────────────────── */
      const clock  = new THREE.Clock();
      const REPEL_R = 1.6, REPEL_S = 0.05, SPRING = 0.038;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t   = clock.getElapsedTime();

        // Update mouse3D from raw coords once per frame
        unprojectMouse(rawMX, rawMY);

        /* Scroll stage ── read here, NEVER in a scroll listener */
        const scrollY   = window.scrollY || 0;
        const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        const prog      = scrollY / maxScroll;

        let tSpread, tOp, tLine, rotMul;
        if (prog < 0.15) {
          tSpread=1;    tOp=0.72; tLine=0.10; rotMul=1;
        } else if (prog < 0.40) {
          const s=(prog-0.15)/0.25;
          tSpread=lerp(1,2.1,s); tOp=lerp(0.72,0.42,s); tLine=lerp(0.10,0.22,s); rotMul=lerp(1,0.4,s);
        } else if (prog < 0.65) {
          const s=(prog-0.40)/0.25;
          tSpread=lerp(2.1,3,s); tOp=lerp(0.42,0.14,s); tLine=lerp(0.22,0.04,s); rotMul=0.2;
        } else {
          const s=(prog-0.65)/0.35;
          tSpread=lerp(3,2,s);   tOp=lerp(0.14,0.04,s); tLine=lerp(0.04,0.01,s); rotMul=0.1;
        }

        lerpSpread = lerp(lerpSpread, tSpread, 0.042);
        lerpOp     = lerp(lerpOp,     tOp,     0.042);
        const lerpLine = lerp(lMat.opacity, tLine, 0.042);

        pointMesh.scale.setScalar(lerpSpread);
        lineMesh.scale.setScalar(lerpSpread);
        pMat.opacity = lerpOp;
        lMat.opacity = lerpLine;

        /* Slow rotation */
        const rs = 0.00045 * rotMul;
        pointMesh.rotation.y += rs;
        pointMesh.rotation.x += rs * 0.55;
        lineMesh.rotation.copy(pointMesh.rotation);

        /* Per-particle: spring return + mouse repulsion + click ripple */
        const pa   = pGeo.attributes.position.array;
        const elapsed = t - rippleT;
        const rippling = elapsed < 1.6;
        const rippleRadius  = elapsed * 4.2;
        const rippleStrength = rippling ? (1 - elapsed / 1.6) * 0.14 : 0;

        for (let i = 0; i < COUNT; i++) {
          const ix = i*3, iy = ix+1;

          // Spring toward original position
          pa[ix] += (origPos[ix] - pa[ix]) * SPRING;
          pa[iy] += (origPos[iy] - pa[iy]) * SPRING;

          // Mouse repulsion (2D projection on z=0 plane)
          const dx = pa[ix] - mouse3D.x;
          const dy = pa[iy] - mouse3D.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < REPEL_R * REPEL_R && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const f = (1 - d / REPEL_R) * REPEL_S;
            pa[ix] += (dx/d) * f;
            pa[iy] += (dy/d) * f;
          }

          // Click ripple ring
          if (rippling) {
            const rx = pa[ix] - rippleX;
            const ry = pa[iy] - rippleY;
            const rd = Math.sqrt(rx*rx + ry*ry);
            const ring = Math.abs(rd - rippleRadius);
            if (ring < 0.55) {
              const f = (1 - ring/0.55) * rippleStrength;
              pa[ix] += (rx / Math.max(rd, 0.1)) * f;
              pa[iy] += (ry / Math.max(rd, 0.1)) * f;
            }
          }
        }
        pGeo.attributes.position.needsUpdate = true;

        // Subtle breathing pulse
        pMat.size = 0.026 + 0.006 * Math.sin(t * 0.6);

        // Camera parallax from mouse
        camera.position.x += (mouse3D.x * 0.08 - camera.position.x) * 0.04;
        camera.position.y += (mouse3D.y * 0.06 - camera.position.y) * 0.04;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('touchmove',  onTouch);
        window.removeEventListener('click', onClick);
        window.removeEventListener('resize', onResize);
        pGeo.dispose(); pMat.dispose();
        lGeo.dispose(); lMat.dispose();
        renderer.dispose();
        mountRef.current?.contains(renderer.domElement) &&
          mountRef.current.removeChild(renderer.domElement);
      };
    }

    let cleanup;
    init().then(fn => { cleanup = fn; });
    return () => { cleanup?.(); cancelAnimationFrame(animId); };
  }, []);

  return <div ref={mountRef} className="pointer-events-none" aria-hidden />;
}
