
import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants.js';

const Testimonials = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#002B5B]">Global Trust, Local Excellence</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Providing high-end infrastructure for industry titans since our inception.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-gray-50 p-8 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-teal-100" />
              <div className="mb-6">
                <p className="text-gray-700 italic leading-relaxed">"{t.content}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
                />
                <div>
                  <h4 className="font-bold text-[#002B5B]">{t.name}</h4>
                  <p className="text-xs text-[#20B2AA] font-bold">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
