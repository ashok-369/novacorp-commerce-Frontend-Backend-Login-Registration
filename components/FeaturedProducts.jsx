
import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../constants.js';

const FeaturedProducts = ({ onAddToCart }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-[#002B5B]">Flagship Enterprise Units</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Selected for performance, scalability, and mission-critical reliability.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all group">
              <div className="h-64 overflow-hidden"><img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
              <div className="p-6 flex-grow space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                  <span>{p.category}</span>
                  <span className="flex items-center gap-1 text-yellow-500"><Star className="w-3 h-3 fill-current" /> {p.rating}</span>
                </div>
                <h3 className="text-xl font-bold text-[#002B5B] leading-tight">{p.name}</h3>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-2xl font-black text-[#002B5B]">${p.price.toLocaleString()}</span>
                  <button onClick={() => onAddToCart(p)} className="p-2 bg-[#20B2AA]/10 text-[#20B2AA] rounded-lg hover:bg-[#20B2AA] hover:text-white transition-all">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
