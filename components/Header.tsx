import React from 'react';
import Logo from './Logo';

interface HeaderProps {
    onAdminClick: () => void;
    isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick, isAdmin }) => {
  return (
    <header className="bg-dark-bg/80 backdrop-blur-sm border-b border-dark-border sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#products" className="text-gray-300 hover:text-primary transition-colors">Products</a>
            <a href="#about" className="text-gray-300 hover:text-primary transition-colors">About</a>
            <a href="#reviews" className="text-gray-300 hover:text-primary transition-colors">Reviews</a>
             <button onClick={onAdminClick} className="text-gray-300 hover:text-primary transition-colors">
              {isAdmin ? 'Hide Dashboard' : 'Admin Dashboard'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;