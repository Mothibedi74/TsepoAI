import React from 'react';
import { X, ShieldCheck, DownloadCloud } from 'lucide-react';
import type { Product } from '../types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-dark-card border border-dark-border rounded-lg shadow-2xl w-full max-w-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Confirm Your Purchase</h2>
          <p className="text-gray-400 mb-6">You are about to purchase '{product.name}'.</p>
        </div>
        
        <div className="bg-dark-bg border border-dark-border rounded-lg p-4 mb-6 text-center">
            <p className="text-3xl font-bold text-primary">${product.price}
                {product.priceType === 'Subscription' && <span className="text-base font-normal text-gray-400">/mo</span>}
            </p>
            <p className="text-sm text-gray-400">{product.priceType === 'LTD' ? 'One-time payment' : 'Billed monthly'}</p>
        </div>

        <div className="text-sm text-gray-400 space-y-3 mb-8">
            <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p>You will be redirected to PayPal for a secure transaction. No payment information is handled on our site.</p>
            </div>
            <div className="flex items-start gap-3">
                <DownloadCloud className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p>After a successful payment, you will receive an email with a secure link to download and install the application.</p>
            </div>
        </div>

        <a
          href={product.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full block text-center bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Proceed to PayPal
        </a>
      </div>
    </div>
  );
};

export default PurchaseModal;
