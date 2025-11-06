import React from 'react';
import type { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const placeholderImage = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop';
  
  return (
    <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden flex flex-col group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-primary/20">
      <div className="relative">
        <img 
          src={product.imageUrl || placeholderImage} 
          alt={product.name} 
          className="w-full h-56 object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = placeholderImage; }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 flex-grow mb-4">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${
              product.priceType === 'LTD' 
                ? 'bg-green-500/20 text-green-300' 
                : 'bg-purple-500/20 text-purple-300'
            }`}>
              {product.priceType === 'LTD' ? 'Lifetime Deal' : 'Subscription'}
            </span>
          </div>
        </div>
         <a
            href={product.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full flex items-center justify-center bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Buy Now
            <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;