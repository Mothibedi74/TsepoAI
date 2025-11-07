import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPurchase: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.priceType === 'LTD' ? 'Lifetime Deal' : 'Subscription'}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-white">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-2xl font-bold text-primary">
            ${product.price}
            {product.priceType === 'Subscription' && <span className="text-sm font-normal text-gray-400">/mo</span>}
          </p>
          <button
            onClick={() => onPurchase(product)}
            className="flex items-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <ShoppingCart size={18} className="mr-2" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
