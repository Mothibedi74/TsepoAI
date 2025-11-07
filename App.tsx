
import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import AddProductForm from './components/AddProductForm';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import About from './components/About';
import PurchaseModal from './components/PurchaseModal';
import CommunityReviews from './components/CommunityReviews';
import type { Product, Review } from './types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './constants';
import { generateProductDetails } from './services/geminiService';

// Lazily load the UserAnalytics component to prevent its dependencies from blocking the initial app render.
const UserAnalytics = lazy(() => import('./components/UserAnalytics'));


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
                    <label htmlFor="product-search" className="sr-only">Search for products by name or description</label>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} aria-hidden="true" />
                    <input
                        type="search"
                        id="product-search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 pl-12 focus:ring-2 focus:ring-primary focus:border-primary transition"
                        aria-controls="product-list-container"
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
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return window.localStorage.getItem('isAdminLoggedIn') === 'true';
    } catch {
      return false;
    }
  });
  const [productToPurchase, setProductToPurchase] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);
  
  useEffect(() => {
    try {
      window.localStorage.setItem('isAdminLoggedIn', String(isAdminLoggedIn));
    } catch (e) {
      console.error("Failed to save admin state to localStorage:", e);
    }
  }, [isAdminLoggedIn]);

  const handleAddProduct = async (idea: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const productDetails = await generateProductDetails(idea);
      const newProduct: Product = {
        ...productDetails,
        id: new Date().toISOString(),
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

  const handleImportProducts = (importedProducts: Product[]) => {
    setProducts(prevProducts => [...importedProducts, ...prevProducts]);
  };
  
  const handleAddReview = (reviewData: Omit<Review, 'id' | 'avatarUrl'>) => {
    const newReview: Review = {
        ...reviewData,
        id: `r${new Date().getTime()}`,
        avatarUrl: `https://i.pravatar.cc/150?u=${new Date().getTime()}`,
    };
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };
  
  const handleAdminClick = () => {
    setIsAdminLoggedIn(prev => !prev);
  };
  
  const handlePurchase = (product: Product) => {
    setProductToPurchase(product);
  }

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
      <Header onAdminClick={handleAdminClick} isAdmin={isAdminLoggedIn} />
      
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12">
        <Hero />

        {isAdminLoggedIn && (
           <section className="my-16 p-8 bg-dark-card border border-dark-border rounded-lg">
             <h2 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h2>
             <AddProductForm 
                onAddProduct={handleAddProduct} 
                onImportProducts={handleImportProducts}
                isLoading={isLoading} 
                error={error} 
             />
             <div className="border-t border-dark-border my-8"></div>
             <Suspense fallback={<div className="text-center p-8">Loading Analytics...</div>}>
                <UserAnalytics />
             </Suspense>
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
            <ProductList products={filteredProducts} onPurchase={handlePurchase} />
        </section>

        <CommunityReviews reviews={reviews} onAddReview={handleAddReview} />

      </main>
      
      <Footer />

      <PurchaseModal 
        isOpen={!!productToPurchase}
        onClose={() => setProductToPurchase(null)}
        product={productToPurchase}
      />
    </div>
  );
};

export default App;
