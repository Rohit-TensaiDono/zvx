"use client";
import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted (demo). Replace with Formspree or API for production.");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-[#0B0B0C] to-[#1a1a1c]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#c0c0c0] to-white bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your vision into reality? Let's discuss how ZenVoraX can elevate your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-[#1a1a1c] to-[#2a2a2e] rounded-3xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#2a2a2e] border-gray-600/50 text-white placeholder-gray-400 h-14 text-lg focus:border-[#F0C85A] focus:ring-[#F0C85A] rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#2a2a2e] border-gray-600/50 text-white placeholder-gray-400 h-14 text-lg focus:border-[#F0C85A] focus:ring-[#F0C85A] rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-[#2a2a2e] border-gray-600/50 text-white placeholder-gray-400 text-lg focus:border-[#F0C85A] focus:ring-[#F0C85A] rounded-xl resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black hover:from-[#f4d373] to-[#F0C85A] rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

              <div className="space-y-6">
                {/* Email Links */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F0C85A] to-[#f4d373] rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                    <div className="space-y-1">
                      <a href="mailto:rohit@zenvorax.in" className="text-gray-300 hover:text-[#F0C85A] transition-colors duration-300 block">rohit@zenvorax.in</a>
                      <a href="mailto:info@zenvorax.in" className="text-gray-300 hover:text-[#F0C85A] transition-colors duration-300 block">info@zenvorax.in</a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D43C2F] to-[#e65a4f] rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Location</h4>
                    <p className="text-gray-300">Global Operations<br />From Garage to Globe</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c0c0c0] to-[#e0e0e0] rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Response Time</h4>
                    <p className="text-gray-300">We typically respond within<br />24 hours during business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#2a2a2e] to-[#1a1a1c] rounded-3xl p-8 border border-gray-700/50">
              <h4 className="text-xl font-bold text-white mb-4">Ready to Innovate?</h4>
              <p className="text-gray-300 mb-6">Join the future of technology with ZenVoraX. Let's build something extraordinary together.</p>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] bg-clip-text text-transparent">From Garage to Globe</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
