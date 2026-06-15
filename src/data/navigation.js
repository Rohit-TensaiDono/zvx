/**
 * Navigation structure.
 * Update links here — Navbar reads from this file.
 */
import { ROUTES } from '@/constants/routes';

export const productDropdown = [
  { name: 'R-VAK Ecosystem', href: ROUTES.products.rvak,    desc: 'Smart Glasses & Athena Pen' },
  { name: 'Nemesis AI',      href: ROUTES.sections.products, desc: 'Offline-first AI Assistant' },
  { name: 'BESS Solutions',  href: ROUTES.products.bess,     desc: 'Battery Energy Storage' },
  { name: 'ZVX Aura Robot',  href: ROUTES.sections.robotics, desc: 'Home Automation Companion' },
  { name: 'ZVX Drones',      href: ROUTES.sections.drones,   desc: 'Aerial Solutions' },
];

export const mainLinks = [
  { name: 'Agency',  href: ROUTES.agency },
  { name: 'About',   href: ROUTES.sections.about },
  { name: 'Contact', href: ROUTES.sections.contact },
];
