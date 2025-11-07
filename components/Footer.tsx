import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-16 text-center p-6 text-gray-400 text-sm">
      <p className="mb-2 space-x-4">
        <a href="mailto:tsepomotsatse@gmail.com" className="text-gray-300 hover:text-primary transition-colors">tsepomotsatse@gmail.com</a>
        <span>|</span>
        <a href="https://wa.me/27679489264" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">WhatsApp</a>
        <span>|</span>
        <a href="tel:+27679489264" className="text-gray-300 hover:text-primary transition-colors">Phone: +27 (0) 67 948 9264</a>
      </p>
      <p className="text-gray-500">&copy; {new Date().getFullYear()} TsepoAI by Tsepo Motsatse. All rights reserved.</p>
    </footer>
  );
};

export default Footer;