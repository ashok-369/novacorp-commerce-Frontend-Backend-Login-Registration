
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-[#002B5B] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-[#20B2AA] rounded-full text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" /> Enterprise Hardware
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            The Future of <span className="text-[#20B2AA]">Corporate Infrastructure</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-xl">
            Precision-engineered hardware and zero-trust solutions for global enterprises.
          </p>
          <div className="flex gap-4">
            <Link to="/products" className="bg-[#20B2AA] text-white px-8 py-4 rounded-md font-bold flex items-center gap-2 hover:bg-teal-600 transition-all">
              Browse Inventory <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border border-white/30 px-8 py-4 rounded-md font-bold hover:bg-white/10 transition-all">
              Request Quote
            </button>
          </div>
        </div>
        <div className="hidden lg:block">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" alt="Office" className="rounded-2xl shadow-2xl border-4 border-white/10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
