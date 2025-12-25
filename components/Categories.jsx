
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants.js';

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (catName) => {
    // Normalizing names for URL
    const category = catName === 'Computing' ? 'Laptops' : catName;
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#002B5B]">Sector Specialization</h2>
            <p className="text-gray-500 mt-2">Precision hardware for high-performance departments.</p>
          </div>
          <button 
            onClick={() => navigate('/products')} 
            className="text-[#20B2AA] font-bold hover:underline"
          >
            Full Inventory
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(c => (
            <div 
              key={c.id} 
              onClick={() => handleCategoryClick(c.name)}
              className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all active:scale-95"
            >
              <img src={c.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002B5B] via-[#002B5B]/40 to-transparent opacity-80" />
              <div className="absolute bottom-0 p-8 text-white">
                <h3 className="text-2xl font-bold">{c.name}</h3>
                <p className="text-xs text-teal-300 font-bold mt-1 tracking-widest uppercase">{c.count} Units Stocked</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
