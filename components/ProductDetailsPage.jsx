
import React from 'react';
import { useParams, useNavigate, Link, useOutletContext } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, CheckCircle, Truck, Globe } from 'lucide-react';
import { PRODUCTS } from '../constants.js';

const ProductDetailsPage = () => {
  const { addToCart } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#002B5B] mb-4">Unit Not Found</h1>
          <p className="text-gray-500 mb-8">The requested hardware ID does not exist in our current inventory.</p>
          <Link to="/products" className="bg-[#20B2AA] text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 font-bold mb-10 hover:text-[#002B5B] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Previous View
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-teal-50 text-[#20B2AA] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">{product.category}</span>
                <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" /> {product.rating} (48 Corporate Reviews)
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#002B5B] leading-tight">{product.name}</h1>
              <p className="text-lg text-gray-500 leading-relaxed">
                Enterprise-grade solution engineered for high-availability environments. This unit undergoes 144 hours of stress testing before deployment to ensure 99.9% uptime compliance.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Enterprise MSRP</p>
                  <p className="text-4xl font-black text-[#002B5B]">${product.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-[#20B2AA] font-bold text-sm">
                    <CheckCircle className="w-4 h-4" /> Ready for Dispatch
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => addToCart(product)} 
                  className="flex-grow bg-[#20B2AA] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-teal-500/20 hover:bg-teal-600 transition-all active:scale-95"
                >
                  <ShoppingCart className="w-6 h-6" /> Add to Procurement
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-blue-50 text-[#002B5B] rounded-xl flex items-center justify-center flex-shrink-0"><Truck className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm text-[#002B5B]">Insured Shipping</h4>
                  <p className="text-xs text-gray-500 mt-1">Global logistics tracking included.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-teal-50 text-[#20B2AA] rounded-xl flex items-center justify-center flex-shrink-0"><Globe className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-sm text-[#002B5B]">24/7 Priority Support</h4>
                  <p className="text-xs text-gray-500 mt-1">Dedicated enterprise accounts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
