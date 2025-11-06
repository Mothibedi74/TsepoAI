import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-16 text-center p-6 text-gray-400 text-sm">
      <p className="mb-2">
        Support: <a href="mailto:tsepomotsatse@gmail.com" className="text-gray-300 hover:text-primary transition-colors">tsepomotsatse@gmail.com</a> or Phone: <a href="tel:+27614482092" className="text-gray-300 hover:text-primary transition-colors">+27 (0) 61 448 2092</a>
      </p>
      <p className="text-gray-500">&copy; {new Date().getFullYear()} TsepoAI by Tsepo Motsatse. All rights reserved.</p>
    </footer>
  );
};

export default Footer;