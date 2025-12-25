
import React, { useMemo } from 'react';
import { useSearchParams, Link, useOutletContext } from 'react-router-dom';
import { Star, ShoppingCart, Filter, X, Search } from 'lucide-react';
import { PRODUCTS } from '../constants.js';

const ProductsPage = () => {
  const { addToCart } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentCategory = searchParams.get('category');
  const currentSearch = searchParams.get('search');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = currentSearch 
        ? p.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
          p.category.toLowerCase().includes(currentSearch.toLowerCase())
        : true;
      const matchesCategory = currentCategory ? p.category.toLowerCase() === currentCategory.toLowerCase() : true;
      return matchesSearch && matchesCategory;
    });
  }, [currentSearch, currentCategory]);

  const clearFilters = () => {
    setSearchParams({});
  };

  const handleCategoryToggle = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (currentCategory === cat) {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <nav className="flex text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              <Link to="/" className="hover:text-[#20B2AA]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-600">Inventory</span>
            </nav>
            <h1 className="text-4xl font-bold text-[#002B5B]">
              {currentCategory ? `${currentCategory} Systems` : 'Enterprise Catalog'}
            </h1>
            {currentSearch && (
              <p className="text-gray-500 mt-2">Showing results for: <span className="text-[#20B2AA] font-bold">"{currentSearch}"</span></p>
            )}
          </div>
          {(currentCategory || currentSearch) && (
            <button onClick={clearFilters} className="text-[#20B2AA] font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:bg-teal-50 transition-all">
              <X className="w-4 h-4" /> Reset All Filters
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
              <h3 className="font-bold text-[#002B5B] flex items-center gap-2 mb-6 border-b pb-4">
                <Filter className="w-4 h-4 text-[#20B2AA]" /> Catalog Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h4>
                  <div className="space-y-2">
                    {['Laptops', 'Accessories', 'Furniture', 'Monitors', 'Security'].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => handleCategoryToggle(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          currentCategory === cat ? 'bg-[#002B5B] text-white' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Unit Status</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#20B2AA] rounded" /> 
                      Immediate Deployment
                    </label>
                    <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-[#20B2AA] rounded" /> 
                      Pre-order Availability
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group flex flex-col">
                    <Link to={`/product/${p.id}`} className="block relative h-64 overflow-hidden">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </Link>
                    <div className="p-6 flex-grow flex flex-col space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.category}</span>
                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                          <Star className="w-3 h-3 fill-current" /> {p.rating}
                        </div>
                      </div>
                      <Link to={`/product/${p.id}`} className="block">
                        <h3 className="font-bold text-[#002B5B] text-lg leading-tight hover:text-[#20B2AA] transition-colors line-clamp-2">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="pt-4 mt-auto flex justify-between items-center border-t border-gray-50">
                        <span className="text-2xl font-black text-[#002B5B]">${p.price.toLocaleString()}</span>
                        <button 
                          onClick={() => addToCart(p)} 
                          className="p-3 bg-[#20B2AA] text-white rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/10 active:scale-90"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-24 text-center rounded-3xl border border-gray-100 shadow-sm">
                <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#002B5B]">No Hardware Found</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't find any products matching your current filters or search query.</p>
                <button 
                  onClick={clearFilters} 
                  className="mt-8 bg-[#002B5B] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  View All Inventory
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
