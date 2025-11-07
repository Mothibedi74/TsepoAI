import React, { useState } from 'react';
import { PlusCircle, Loader, AlertCircle, Upload } from 'lucide-react';

interface AddProductFormProps {
  onAddProduct: (idea: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, isLoading, error }) => {
  const [idea, setIdea] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onAddProduct(idea.trim());
      setIdea('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      // TODO: Implement file import logic here.
      // For now, it just shows the file name.
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
                <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
        </div>
    </div>
  );
};

export default AddProductForm;
