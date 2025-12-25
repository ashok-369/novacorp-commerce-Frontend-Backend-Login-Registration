
import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';

const CartPage = () => {
  const { items = [], onUpdateQuantity, onRemove } = useOutletContext();
  
  // Note: The context provides these but we need to ensure they're available.
  // In our context structure, we pass 'cart' as 'items'
  const { cart, updateQuantity, removeFromCart } = useOutletContext();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + (subtotal * 0.08) + (cart.length ? 59 : 0);

  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/products" className="flex items-center gap-2 text-gray-500 font-bold mb-8 hover:text-[#002B5B] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold text-[#002B5B] mb-12">Procurement Cart</h1>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.length ? cart.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl flex items-center gap-6 border border-gray-100 shadow-sm">
                <img src={item.image} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold text-[#002B5B]">{item.name}</h3>
                  <p className="text-xl font-black text-teal-600 mt-1">${item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full">
                  <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-teal-600 transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-teal-600 transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-400 text-lg mb-6">Your cart is currently empty.</p>
                <Link to="/products" className="bg-[#002B5B] text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-all">
                  Browse Products
                </Link>
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl h-fit">
              <h3 className="text-xl font-bold mb-6">Summary</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>$59.00</span></div>
                <div className="border-t pt-4 flex justify-between text-xl font-black text-[#002B5B]">
                  <span>Total</span><span>${total.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full mt-8 bg-[#20B2AA] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-teal-500/20 active:scale-95 transition-all">
                <CreditCard /> Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
