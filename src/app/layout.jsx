import './globals.css';
import Navbar            from '@/components/layout/Navbar';
import Footer            from '@/components/layout/Footer';
import ScrollMesh        from '@/components/three/ScrollMesh';
import ScrollScrim       from '@/components/ui/ScrollScrim';
import { PageTransition }  from '@/components/ui/PageTransition';
import { CustomCursor }    from '@/components/ui/CustomCursor';

export const metadata = {
  title:       'ZenVoraX — From Garage to Globe',
  description: 'Pioneering AR wearables, edge AI, sustainable energy, robotics & drones.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Custom cursor — above everything */}
        <CustomCursor />

        {/* Z0: Neural globe */}
        <ScrollMesh />

        {/* Z1-2: Edge vignettes */}
        <ScrollScrim />

        {/* Z10+: Page content */}
        <div className="relative z-10">
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
