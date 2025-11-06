import React, { useState } from 'react';
import { PlusCircle, Loader, AlertCircle } from 'lucide-react';

interface AddProductFormProps {
  onAddProduct: (idea: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, isLoading, error }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onAddProduct(idea.trim());
      setIdea('');
    }
  };

  return (
    <section className="mb-16">
      <div className="max-w-3xl mx-auto bg-dark-card border border-dark-border rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">AI Product Idea Generator</h2>
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
      </div>
    </section>
  );
};

export default AddProductForm;