import React from 'react';
import { Instagram, Facebook, Twitter, MessageCircle, Menu, CircleDot, User } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-[#1a1b25] text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Age Restriction and License */}
        <div className="flex items-center gap-2 mb-4 text-gray-400">
          <div className="flex items-center gap-2 text-sm">
            <span className="border border-gray-400 rounded px-2">18+</span>
          </div>
          <span>© 2024 Your Store. All rights reserved.</span>
        </div>

        {/* Store Name and Payment Info */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-4">ADETON • GHANA</h2>

          {/* Payment Details 
           <div className="mb-6">
            <p className="text-gray-400 mb-2">Payment methods</p>
            <div className="flex justify-center gap-4 mb-4">
              {/* Payment Method Icons - Replace with your actual payment method logos 
              <div className="bg-gray-700 rounded-full p-2">
                <img src="/api/placeholder/32/32" alt="Payment 1" className="w-8 h-8" />
              </div>
              <div className="bg-gray-700 rounded-full p-2">
                <img src="/api/placeholder/32/32" alt="Payment 2" className="w-8 h-8" />
              </div>
              <div className="bg-gray-700 rounded-full p-2">
                <img src="/api/placeholder/32/32" alt="Payment 3" className="w-8 h-8" />
              </div>
            </div>
          </div> */}

          {/* Terms and Legal */}
          <p className="text-sm text-gray-400 mb-6 max-w-2xl mx-auto">
            Age 18 and above only. Shop Responsibly. Online shopping can be addictive
            and can be psychologically harmful. Your Store Ghana is
            licensed by the Commerce Commission of Ghana.
          </p>

          {/* Links */}
          <div className="flex justify-center gap-4 text-gray-400 mb-8">
            <a href="#" className="hover:text-white text-sm">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-white text-sm">About Us</a>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="hover:text-gray-400">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Bottom Navigation */}
        
      </div>
    </div>
  );
};

export default Footer;