import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/LandingPage';
import AddProductForm from './components/ChatbotBuilder';
import ProductList from './components/AnalyticsPanel';
import Footer from './components/DeployPanel';
import About from './components/About';
import type { Product } from './types';
import { INITIAL_PRODUCTS } from './constants';
import { generateProductDetails } from './services/geminiService';

type FilterType = 'All' | 'LTD' | 'Subscription';

interface FilterControlsProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ searchQuery, onSearchChange, activeFilter, onFilterChange }) => {
    const filters: FilterType[] = ['All', 'LTD', 'Subscription'];
    const filterLabels: Record<FilterType, string> = {
        All: 'All',
        LTD: 'Lifetime Deal',
        Subscription: 'Subscription'
    };

    return (
        <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 pl-12 focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                </div>
                <div className="flex items-center bg-dark-card border border-dark-border rounded-lg p-1 space-x-1">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                                activeFilter === filter
                                    ? 'bg-primary text-white'
                                    : 'text-gray-300 hover:bg-dark-border'
                            }`}
                        >
                            {filterLabels[filter]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const handleAddProduct = async (idea: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const productDetails = await generateProductDetails(idea);
      const newProduct: Product = {
        ...productDetails,
        id: new Date().toISOString(),
        imageUrl: `https://source.unsplash.com/800x600/?${encodeURIComponent(productDetails.imageQuery)}`,
      };
      setProducts(prevProducts => [newProduct, ...prevProducts]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        if (activeFilter === 'All') return true;
        return product.priceType === activeFilter;
      })
      .filter(product => {
        const query = searchQuery.toLowerCase();
        return product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
      });
  }, [products, searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 flex flex-col">
      <Header onToggleAdmin={() => setIsAdminVisible(!isAdminVisible)} />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12">
        <Hero />
        {isAdminVisible && (
           <section className="mb-16">
             <h2 className="text-4xl font-bold text-center mb-4">Admin Panel</h2>
             <AddProductForm onAddProduct={handleAddProduct} isLoading={isLoading} error={error} />
           </section>
        )}
        <About />
        <section id="products" className="my-16">
            <h2 className="text-4xl font-bold text-center mb-12">My Products</h2>
            <FilterControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />
            <ProductList products={filteredProducts} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;