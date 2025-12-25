
import React from 'react';
import { Linkedin, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#002B5B] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">N</div><span className="text-2xl font-bold">NovaCorp</span></div>
          <p className="text-blue-100/60 text-sm leading-relaxed">Global enterprise hardware provider since 2008.</p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Solutions</h4>
          <ul className="space-y-3 text-sm text-blue-100/60"><li>Infrastructure</li><li>Cybersecurity</li><li>Procurement</li></ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-3 text-sm text-blue-100/60"><li>Help Center</li><li>Order Status</li><li>API Documentation</li></ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Contact</h4>
          <ul className="space-y-3 text-sm text-blue-100/60 flex flex-col">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@novacorp.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (800) NOVA-CRP</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-blue-100/30">
        <p>© 2024 NovaCorp Technologies. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0"><span>Privacy Policy</span><span>Terms of Service</span></div>
      </div>
    </footer>
  );
};

export default Footer;
