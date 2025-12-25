
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const MainLayout = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(() => {
    // Attempt to load user from localStorage on init
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const login = (userData) => {
    setUser(userData);
    // Note: redirection is handled in the LoginPage after successful fetch
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Header 
        cartCount={cartCount} 
        user={user} 
        onLogout={logout} 
      />
      
      <main className="flex-grow">
        <Outlet context={{ 
          cart, 
          addToCart, 
          updateQuantity, 
          removeFromCart, 
          user, 
          login, 
          logout 
        }} />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
