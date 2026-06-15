'use client';
/**
 * ScrollMesh — 3D globe where nodes ARE the cards.
 *
 * KEY CHANGE: ANCHOR_NODES are organized by section and colored
 * to match their corresponding cards. When mesh-arrived fires,
 * two things happen simultaneously:
 *   1. aMat.size spikes (anchPulse) so nodes flash bright — visible burst
 *   2. Cards begin their node→card spring animation (in RevealItem)
 *
 * The node flash + card expansion happen at the same moment,
 * creating the illusion that the nodes ARE expanding into cards.
 *
 * NODE COLORS match card accent colors exactly:
 *   products → gold(R-VAK Astral), red(Spectral), blue(Orion),
 *              silver(Athena), red(Nemesis), gold(BESS), blue(Robot), purple(Drones)
 *   about    → gold, red, blue, silver (4 value cards)
 *   contact  → gold, red, blue, silver (4 contact items)
 *   agency   → blue, gold, purple, green (service categories)
 */
import { useEffect, useRef } from 'react';

const lerp    = (a, b, t) => a + (b - a) * t;
const easeIO  = t => t < .5 ? 2*t*t : -1+(4-2*t)*t;

const BASE_Z      = 8.0;
const ZOOM_FACTOR = 1.5;
const NAV_OUT     = 400;
const NAV_IN      = 520;
const LERP_NAV    = 0.065;

const ANCHORS = {
  hero:     { ry:  0.00, rx:  0.00 },
  products: { ry:  1.20, rx: -0.25 },
  about:    { ry: -1.40, rx:  0.28 },
  contact:  { ry:  0.72, rx:  0.48 },
  agency:   { ry:  2.10, rx: -0.38 },
  bess:     { ry:  1.55, rx:  0.22 },
  rvak:     { ry:  1.82, rx: -0.28 },
  robot:    { ry: -0.88, rx:  0.32 },
  drones:   { ry:  0.42, rx: -0.52 },
};

/**
 * ANCHOR_NODES — one node per card, colored to match.
 * section:   which globe face they belong to
 * color:     matches the card's accent color exactly
 * size:      larger for primary cards, smaller for secondary
 *
 * Positions: front-facing when mesh is at that anchor rotation.
 * Formula:   x = sin(ry)*r,  z = cos(ry)*r  for the front point.
 */
const ANCHOR_NODES = [
  // ── products face (ry≈1.20) ──────────────────────────────────
  // R-VAK cards (gold/red/blue/silver matching tier colors)
  { x: 4.8, y: 1.5, z: 1.9, color: '#F0C85A', size: 0.095, section: 'products' }, // Astral
  { x: 4.5, y: 0.3, z: 2.4, color: '#D43C2F', size: 0.088, section: 'products' }, // Spectral
  { x: 5.0, y: -0.7, z: 1.4, color: '#3BAAFF', size: 0.092, section: 'products' }, // Orion
  { x: 5.3, y: 0.9, z: 0.9, color: '#c0c0c0', size: 0.080, section: 'products' }, // Athena
  // Vertical product cards
  { x: 4.3, y: -1.4, z: 2.8, color: '#D43C2F', size: 0.082, section: 'products' }, // Nemesis AI
  { x: 4.6, y: 1.9, z: 1.2, color: '#F0C85A', size: 0.082, section: 'products' }, // BESS
  { x: 5.2, y: -0.2, z: 0.7, color: '#3BAAFF', size: 0.082, section: 'products' }, // Robot
  { x: 4.1, y: 1.0, z: 3.1, color: '#a78bfa', size: 0.078, section: 'products' }, // Drones

  // ── about face (ry≈-1.40) ────────────────────────────────────
  { x: -4.8, y: 1.4, z: 0.7, color: '#F0C85A', size: 0.090, section: 'about' }, // Innovation
  { x: -5.2, y: -0.3, z: 0.3, color: '#3BAAFF', size: 0.085, section: 'about' }, // Privacy
  { x: -4.5, y: 0.5, z: 1.2, color: '#D43C2F', size: 0.082, section: 'about' }, // Precision
  { x: -5.0, y: 1.7, z: -0.2, color: '#c0c0c0', size: 0.078, section: 'about' }, // Impact

  // ── contact face (ry≈0.72, rx≈0.48) ─────────────────────────
  { x: 3.4, y: -2.6, z: 3.8, color: '#F0C85A', size: 0.090, section: 'contact' },
  { x: 3.8, y: -1.4, z: 3.3, color: '#D43C2F', size: 0.085, section: 'contact' },
  { x: 2.9, y: -3.3, z: 4.1, color: '#3BAAFF', size: 0.082, section: 'contact' },
  { x: 4.1, y: -1.9, z: 2.8, color: '#c0c0c0', size: 0.076, section: 'contact' },

  // ── agency face (ry≈2.10) ────────────────────────────────────
  { x: 4.3, y: 1.2, z: -2.4, color: '#3BAAFF', size: 0.090, section: 'agency' },
  { x: 4.6, y: -0.3, z: -1.9, color: '#F0C85A', size: 0.085, section: 'agency' },
  { x: 4.1, y: 1.9, z: -2.9, color: '#a78bfa', size: 0.082, section: 'agency' },
  { x: 4.8, y: 0.2, z: -1.4, color: '#22c55e', size: 0.078, section: 'agency' },
  { x: 4.0, y: -1.0, z: -2.6, color: '#D43C2F', size: 0.075, section: 'agency' },
  { x: 4.5, y: 0.9, z: -0.9, color: '#f472b6', size: 0.075, section: 'agency' },
  { x: 5.0, y: 1.5, z: -2.1, color: '#fb923c', size: 0.072, section: 'agency' },
  { x: 3.8, y: -1.7, z: -3.3, color: '#F0C85A', size: 0.070, section: 'agency' },
];

export default function ScrollMesh() {
  const mountRef = useRef(null);

  useEffect(() => {
    let THREE, renderer, scene, camera;
    let pointMesh, lineMesh, anchorMesh;
    let pGeo, pMat, lGeo, lMat, aGeo, aMat;
    let animId;

    const origPos = [];
    const mouse3D = { x: 0, y: 0 };
    const baseRot = { y: 0, x: 0 };

    let navOffY = 0, navOffYTarget = 0;
    let navOffX = 0, navOffXTarget = 0;

    // Mouse gyroscope — mesh tilts with cursor position
    let gyroY = 0, gyroX = 0;
    let navPhase = 0, navStart = 0;
    let arrivedTimer = null;

    // Node pulse — spikes on mesh-arrived, decays back to 1.0
    let anchPulse = 1.0;

    let lerpSpread = 1, lerpOp = 0.80;
    let rippleT = -99, rippleX = 0, rippleY = 0;

    function unprojectMouse(cx, cy) {
      if (!camera) return;
      const v = new THREE.Vector3(
        (cx / window.innerWidth) * 2 - 1,
        -(cy / window.innerHeight) * 2 + 1, 0.5
      ).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const t   = (0 - camera.position.z) / dir.z;
      const p   = camera.position.clone().add(dir.multiplyScalar(t));
      mouse3D.x = p.x; mouse3D.y = p.y;
    }

    async function init() {
      THREE = await import('three');

      scene  = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = BASE_Z;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      Object.assign(renderer.domElement.style, {
        position: 'fixed', inset: '0', zIndex: '0', pointerEvents: 'none',
      });
      mountRef.current?.appendChild(renderer.domElement);

      /* ── Regular mesh particles (sphere surface distribution) ── */
      const COUNT   = 360;
      const pos     = new Float32Array(COUNT * 3);
      const col     = new Float32Array(COUNT * 3);
      const palette = [
        new THREE.Color('#F0C85A'), new THREE.Color('#F0C85A'),
        new THREE.Color('#D43C2F'),
        new THREE.Color('#3BAAFF'), new THREE.Color('#00D4FF'),
      ];
      const pts = [];

      for (let i = 0; i < COUNT; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 7.0 + Math.random() * 3.5;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.60;
        const z = r * Math.cos(phi) * 0.60;
        pos[i*3]=x; pos[i*3+1]=y; pos[i*3+2]=z;
        origPos.push(x, y, z);
        pts.push(new THREE.Vector3(x, y, z));
        const c = palette[Math.floor(Math.random() * palette.length)];
        col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
      }

      pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      pMat = new THREE.PointsMaterial({
        size: 0.024, vertexColors: true, transparent: true,
        opacity: 0.78, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      pointMesh = new THREE.Points(pGeo, pMat);
      scene.add(pointMesh);

      /* ── Neural lines ── */
      const lp = [], lc = [];
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          if (pts[i].distanceTo(pts[j]) < 3.2) {
            lp.push(pts[i].x,pts[i].y,pts[i].z, pts[j].x,pts[j].y,pts[j].z);
            const f = Math.random();
            lc.push(0.94,0.78,0.35, 0.23+f*0.77, 0.67+f*0.2, f);
          }
        }
      }
      lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lp), 3));
      lGeo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(lc), 3));
      lMat = new THREE.LineBasicMaterial({
        vertexColors: true, transparent: true, opacity: 0.08,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      lineMesh = new THREE.LineSegments(lGeo, lMat);
      scene.add(lineMesh);

      /* ── Anchor nodes — one per card, colored to match ── */
      const aN  = ANCHOR_NODES.length;
      const aPos = new Float32Array(aN * 3);
      const aCol = new Float32Array(aN * 3);
      ANCHOR_NODES.forEach((n, i) => {
        aPos[i*3]=n.x; aPos[i*3+1]=n.y; aPos[i*3+2]=n.z;
        const c = new THREE.Color(n.color);
        aCol[i*3]=c.r; aCol[i*3+1]=c.g; aCol[i*3+2]=c.b;
      });
      aGeo = new THREE.BufferGeometry();
      aGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3));
      aGeo.setAttribute('color',    new THREE.BufferAttribute(aCol, 3));
      aMat = new THREE.PointsMaterial({
        size: 0.082, vertexColors: true, transparent: true, opacity: 0.70,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      anchorMesh = new THREE.Points(aGeo, aMat);
      scene.add(anchorMesh);

      /* ── Events ── */
      let rawMX = 0, rawMY = 0;
      const onMouse = e => { rawMX = e.clientX; rawMY = e.clientY; };
      const onTouch = e => {
        if (e.touches[0]) { rawMX = e.touches[0].clientX; rawMY = e.touches[0].clientY; }
      };
      const onClick = e => {
        unprojectMouse(e.clientX, e.clientY);
        rippleX = mouse3D.x; rippleY = mouse3D.y; rippleT = performance.now();
      };

      const onNavigate = e => {
        const tgt = ANCHORS[e.detail?.anchor];
        if (!tgt) return;
        navOffYTarget = tgt.ry;
        navOffXTarget = tgt.rx;
        navPhase = 1;
        navStart = performance.now();

        clearTimeout(arrivedTimer);
        arrivedTimer = setTimeout(() => {
          // Flash: nodes spike in size — they are the cards about to appear
          anchPulse = 2.4;
          window.dispatchEvent(
            new CustomEvent('mesh-arrived', { detail: e.detail })
          );
        }, NAV_OUT);
      };

      window.addEventListener('mousemove',     onMouse,     { passive: true });
      window.addEventListener('touchmove',     onTouch,     { passive: true });
      window.addEventListener('click',         onClick);
      window.addEventListener('mesh-navigate', onNavigate);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      /* ── RAF loop ── */
      const clock   = new THREE.Clock();
      const REPEL_R = 3.2, REPEL_S = 0.11, SPRING = 0.030;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const now = performance.now();
        const t   = clock.getElapsedTime();

        unprojectMouse(rawMX, rawMY);

        /* Scroll narrative */
        const sy  = window.scrollY || 0;
        const sh  = document.body.scrollHeight || 0;
        const wh  = window.innerHeight;
        const ms  = Math.max(sh - wh, wh);
        const prog = Math.min(sy / ms, 1);

        let tSpread, tOp, tLine;
        if      (prog < 0.15) { tSpread=1;    tOp=0.80; tLine=0.09; }
        else if (prog < 0.40) { const s=(prog-0.15)/0.25; tSpread=lerp(1,2.0,s);   tOp=lerp(0.80,0.44,s); tLine=lerp(0.09,0.20,s); }
        else if (prog < 0.65) { const s=(prog-0.40)/0.25; tSpread=lerp(2.0,3.0,s); tOp=lerp(0.44,0.18,s); tLine=lerp(0.20,0.05,s); }
        else                  { const s=(prog-0.65)/0.35; tSpread=lerp(3.0,2.0,s); tOp=lerp(0.18,0.06,s); tLine=lerp(0.05,0.02,s); }

        lerpSpread = lerp(lerpSpread, tSpread, 0.04);
        lerpOp     = lerp(lerpOp,     tOp,     0.04);
        pMat.opacity = lerpOp;
        lMat.opacity = lerp(lMat.opacity, tLine, 0.04);

        /* Globe rotation */
        navOffY += (navOffYTarget - navOffY) * LERP_NAV;
        navOffX += (navOffXTarget - navOffX) * LERP_NAV;
        baseRot.y += 0.00026;
        baseRot.x += 0.00009;

        // Gyroscope: mouse position tilts the globe (smooth lerp)
        const tGyroY = (rawMX / Math.max(window.innerWidth,  1) - 0.5) * 0.45;
        const tGyroX = (rawMY / Math.max(window.innerHeight, 1) - 0.5) * 0.30;
        gyroY += (tGyroY - gyroY) * 0.035;
        gyroX += (tGyroX - gyroX) * 0.035;

        const finalY = baseRot.y + navOffY + gyroY;
        const finalX = baseRot.x + navOffX + gyroX;
        pointMesh.rotation.y  = finalY;
        pointMesh.rotation.x  = finalX;
        lineMesh.rotation.y   = finalY;
        lineMesh.rotation.x   = finalX;
        anchorMesh.rotation.y = finalY;
        anchorMesh.rotation.x = finalX;

        pointMesh.scale.setScalar(lerpSpread);
        lineMesh.scale.setScalar(lerpSpread);
        anchorMesh.scale.setScalar(lerpSpread);

        /* Camera zoom */
        const navElapsed = now - navStart;
        if (navPhase === 1) {
          const p = Math.min(navElapsed / NAV_OUT, 1);
          camera.position.z = lerp(BASE_Z, BASE_Z * ZOOM_FACTOR, easeIO(p));
          if (p >= 1) { navPhase = 2; navStart = now; }
        } else if (navPhase === 2) {
          const p = Math.min(navElapsed / NAV_IN, 1);
          camera.position.z = lerp(BASE_Z * ZOOM_FACTOR, BASE_Z, easeIO(p));
          if (p >= 1) { navPhase = 0; camera.position.z = BASE_Z; }
        }

        /* Anchor node pulse — decays from spike back to 1.0 */
        anchPulse = lerp(anchPulse, 1.0, 0.055);
        aMat.size    = (0.078 + 0.018 * Math.sin(t * 0.85 + 0.5)) * anchPulse;
        aMat.opacity = Math.min(lerpOp * 1.15 * Math.min(anchPulse, 1.6), 0.92);

        /* Regular node pulse */
        pMat.size = 0.036 + 0.008 * Math.sin(t * 0.55);

        /* Per-particle physics */
        const pa      = pGeo.attributes.position.array;
        const rSec    = (now - rippleT) * 0.001;
        const rippling = rSec < 1.6;
        const rRad    = rSec * 4.0;
        const rStr    = rippling ? (1 - rSec / 1.6) * 0.10 : 0;

        for (let i = 0; i < COUNT; i++) {
          const ix = i*3, iy = ix+1;
          pa[ix] += (origPos[ix] - pa[ix]) * SPRING;
          pa[iy] += (origPos[iy] - pa[iy]) * SPRING;
          const dx = pa[ix]-mouse3D.x, dy = pa[iy]-mouse3D.y;
          const d2 = dx*dx+dy*dy;
          if (d2 < REPEL_R*REPEL_R && d2 > 1e-4) {
            const d = Math.sqrt(d2), f = (1-d/REPEL_R)*REPEL_S;
            pa[ix]+=(dx/d)*f; pa[iy]+=(dy/d)*f;
          }
          if (rippling) {
            const rx=pa[ix]-rippleX, ry=pa[iy]-rippleY;
            const rd=Math.sqrt(rx*rx+ry*ry);
            if (Math.abs(rd-rRad)<0.5) {
              const f=(1-Math.abs(rd-rRad)/0.5)*rStr;
              pa[ix]+=(rx/Math.max(rd,.1))*f; pa[iy]+=(ry/Math.max(rd,.1))*f;
            }
          }
        }
        pGeo.attributes.position.needsUpdate = true;

        /* Camera parallax */
        camera.position.x += (mouse3D.x*0.055-camera.position.x)*0.032;
        camera.position.y += (mouse3D.y*0.045-camera.position.y)*0.032;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        clearTimeout(arrivedTimer);
        window.removeEventListener('mousemove',     onMouse);
        window.removeEventListener('touchmove',     onTouch);
        window.removeEventListener('click',         onClick);
        window.removeEventListener('mesh-navigate', onNavigate);
        window.removeEventListener('resize',        onResize);
        [pGeo,lGeo,aGeo].forEach(g=>g?.dispose());
        [pMat,lMat,aMat].forEach(m=>m?.dispose());
        renderer?.dispose();
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
