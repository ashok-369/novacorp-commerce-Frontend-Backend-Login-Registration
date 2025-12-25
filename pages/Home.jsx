
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Categories from '../components/Categories.jsx';
import FeaturedProducts from '../components/FeaturedProducts.jsx';
import Testimonials from '../components/Testimonials.jsx';

const Home = () => {
  const { addToCart } = useOutletContext();

  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <Categories />
      <FeaturedProducts onAddToCart={addToCart} />
      <Testimonials />
      
      <section className="bg-[#20B2AA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#002B5B] p-8 md:p-12 rounded-3xl shadow-2xl">
            <div className="text-center lg:text-left max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-2">Enterprise Insights</h2>
              <p className="text-blue-100">Get monthly updates on hardware trends and corporate procurement strategies.</p>
            </div>
            <div className="w-full lg:w-auto">
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Work email address" 
                  className="px-6 py-4 rounded-xl w-full sm:w-80 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
                />
                <button className="bg-[#20B2AA] text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#002B5B] transition-all whitespace-nowrap shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
