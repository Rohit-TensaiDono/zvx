"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Globe } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Globe, href: "#", label: "Website" }
  ];

  return (
    <footer className="bg-gradient-to-t from-[#0B0B0C] to-[#1a1a1c] border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/zvx-logo.png" alt="ZenVoraX Logo" className="w-12 h-12 object-contain" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#c0c0c0] to-white bg-clip-text text-transparent">
                ZenVoraX
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              From garage to globe. Pioneering the future with cutting-edge AR, AI, and sustainable energy solutions.
            </p>
            <div className="text-lg font-semibold bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] bg-clip-text text-transparent">
              From Garage to Globe
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F0C85A] transition-colors duration-300">
                  Chakra View™ Smart Glasses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F0C85A] transition-colors duration-300">
                  Nemesis AI
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F0C85A] transition-colors duration-300">
                  BESS Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section + Social */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#F0C85A]" />
                <a href="mailto:rohit@zenvorax.in" className="text-gray-300 hover:text-[#F0C85A] transition-colors duration-300">
                  rohit@zenvorax.in
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#F0C85A]" />
                <a href="mailto:info@zenvorax.in" className="text-gray-300 hover:text-[#F0C85A] transition-colors duration-300">
                  info@zenvorax.in
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gradient-to-br from-[#2a2a2e] to-[#1a1a1c] rounded-xl flex items-center justify-center border border-gray-700/50 hover:border-[#F0C85A]/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-[#F0C85A] transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">© {new Date().getFullYear()} ZenVoraX. All rights reserved.</p>
            <p className="text-gray-400 text-center md:text-right">Crafted with precision and innovation</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
