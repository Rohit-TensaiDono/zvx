/**
 * Root layout — Navbar, Footer, and ScrollMesh live here.
 * Every page gets them automatically. No manual imports needed in pages.
 */
import './globals.css';
import Navbar   from '@/components/layout/Navbar';
import Footer   from '@/components/layout/Footer';
import ScrollMesh from '@/components/three/ScrollMesh';

export const metadata = {
  title:       'ZenVoraX — From Garage to Globe',
  description: 'Pioneering AR wearables, edge AI, sustainable energy, robotics & drones. Built from first principles.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0B0B0C] text-white overflow-x-hidden">
        {/* Neural mesh — fixed, behind everything, scroll-driven */}
        <ScrollMesh />
        {/* Page content sits above the mesh */}
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
