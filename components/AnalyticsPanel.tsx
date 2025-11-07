import React from 'react';
import type { Product } from '../types';
import ProductCard from './ChatPanel';

interface ProductListProps {
  products: Product[];
  onPurchase: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onPurchase }) => {
  return (
    <>
      {products.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">No products match your current filters.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onPurchase={onPurchase} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
