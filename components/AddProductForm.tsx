import React, { useState, useRef } from 'react';
import { PlusCircle, Loader, AlertCircle, Upload } from 'lucide-react';
import type { Product } from '../types';

interface AddProductFormProps {
  onAddProduct: (idea: string) => Promise<void>;
  onImportProducts: (products: Product[]) => void;
  isLoading: boolean;
  error: string | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, onImportProducts, isLoading, error }) => {
  const [idea, setIdea] = useState('');
  const [fileName, setFileName] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onAddProduct(idea.trim());
      setIdea('');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setImportError(null);

    if (file.type !== 'application/json') {
      setImportError('Invalid file type. Please upload a JSON file.');
      return;
    }

    try {
      const fileContent = await file.text();
      const importedData = JSON.parse(fileContent);

      const productsToImport: Product[] = [];
      const dataArray = Array.isArray(importedData) ? importedData : [importedData];

      for (const item of dataArray) {
        if (
          item.name && typeof item.name === 'string' &&
          item.description && typeof item.description === 'string' &&
          item.price && typeof item.price === 'number' &&
          item.priceType && (item.priceType === 'LTD' || item.priceType === 'Subscription') &&
          item.purchaseUrl && typeof item.purchaseUrl === 'string'
        ) {
          productsToImport.push({
            id: item.id || `imported-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name,
            description: item.description,
            price: item.price,
            priceType: item.priceType,
            purchaseUrl: item.purchaseUrl,
            imageUrl: item.imageUrl || `https://source.unsplash.com/random/800x600/?${encodeURIComponent(item.name)}&sig=${Math.random()}`,
          });
        } else {
          throw new Error('One or more products in the file have an invalid format or are missing required fields.');
        }
      }
      
      if (productsToImport.length === 0) {
          throw new Error('No valid products found in the file.');
      }

      onImportProducts(productsToImport);
      setFileName(''); 
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (err) {
      if (err instanceof SyntaxError) {
          setImportError('Failed to parse file. Please ensure it is a valid JSON.');
      } else if (err instanceof Error) {
        setImportError(err.message);
      } else {
        setImportError('An unknown error occurred during import.');
      }
      setFileName('');
       if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-dark-card border border-dark-border rounded-lg p-6 shadow-lg">
        {/* AI Product Generator */}
        <h3 className="text-2xl font-bold mb-4 text-center text-white">AI Product Idea Generator</h3>
        <p className="text-center text-gray-400 mb-6">Enter a product name or idea, and let AI create a complete listing for you.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., 'AI-powered task manager'"
            className="flex-grow w-full bg-dark-bg border border-dark-border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !idea.trim()}
            className="w-full sm:w-auto flex items-center justify-center bg-primary text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin w-5 h-5 mr-2" />
                <span>Generating...</span>
              </>
            ) : (
               <>
                <PlusCircle className="w-5 h-5 mr-2" />
                <span>Generate Product</span>
              </>
            )}
          </button>
        </form>
        {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg flex items-center gap-2">
                <AlertCircle size={18} />
                <p>{error}</p>
            </div>
        )}

        {/* File Import Section */}
        <div className="border-t border-dark-border my-8"></div>
        <h3 className="text-2xl font-bold mb-4 text-center text-white">Import Existing App</h3>
        <p className="text-center text-gray-400 mb-6">Upload a configuration file to add a new app to the catalog.</p>
        <div className="flex justify-center">
            <label className="flex items-center justify-center bg-dark-bg border-2 border-dashed border-dark-border text-gray-400 font-bold py-3 px-6 rounded-lg cursor-pointer hover:bg-dark-border hover:text-white transition-colors">
                <Upload className="w-5 h-5 mr-2" />
                <span>{fileName || 'Choose a file...'}</span>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="application/json" />
            </label>
        </div>
         {importError && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg flex items-center gap-2">
                <AlertCircle size={18} />
                <p>{importError}</p>
            </div>
        )}
    </div>
  );
};

export default AddProductForm;