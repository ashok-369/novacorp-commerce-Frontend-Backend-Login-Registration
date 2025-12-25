
import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, ChevronDown } from 'lucide-react';

const Header = ({ cartCount, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchInput)}`);
      setSearchInput('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Products', path: '/products' },
  ];

  const userId = user?._id || user?.id;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#002B5B] flex items-center justify-center rounded-lg shadow-sm">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold text-[#002B5B] tracking-tight">NovaCorp</span>
          </NavLink>

          {/* Center Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-bold transition-all uppercase tracking-widest ${isActive ? 'text-[#20B2AA]' : 'text-gray-500 hover:text-[#002B5B]'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions & Profile Section */}
          <div className="flex items-center gap-3 lg:gap-5">
            <form onSubmit={handleSearchSubmit} className="hidden lg:block relative">
              <input 
                type="text" 
                placeholder="Enterprise Search..." 
                className="pl-10 pr-4 py-2 bg-gray-50 rounded-full text-xs font-medium border border-gray-100 focus:ring-2 focus:ring-[#20B2AA] focus:bg-white outline-none w-40 transition-all focus:w-56"
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>

            <NavLink to="/cart" className="text-gray-400 relative p-2 hover:text-[#20B2AA] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#20B2AA] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </NavLink>
            
            {user ? (
              <div className="flex items-center gap-3 border-l pl-5 border-gray-100">
                <Link to={`/profile/${userId}`} className="flex items-center gap-3 group">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-[#002B5B] group-hover:text-[#20B2AA] transition-colors leading-none">{user.name}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-tighter mt-1 font-bold">{user.role || 'Partner'}</p>
                  </div>
                  <div className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-[#002B5B] group-hover:border-[#20B2AA] group-hover:text-[#20B2AA] transition-all overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                </Link>
                <button 
                  onClick={onLogout}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  title="Secure Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-[#002B5B] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-blue-900/10 active:scale-95 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5" /> Login
              </Link>
            )}

            <button className="md:hidden p-2 text-gray-400 hover:text-[#002B5B]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl animate-in slide-in-from-top duration-300 z-50">
          <div className="px-6 py-8 space-y-4">
            {user && (
              <Link 
                to={`/profile/${userId}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 px-5 py-4 bg-gray-50 rounded-2xl mb-6 hover:bg-teal-50 transition-colors border border-gray-100"
              >
                <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center text-[#002B5B] font-bold text-lg shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-[#002B5B]">{user.name}</p>
                  <p className="text-xs text-teal-600 font-bold uppercase tracking-widest">My Profile Dashboard</p>
                </div>
              </Link>
            )}
            
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                type="text" 
                placeholder="Catalog search..." 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#20B2AA] outline-none"
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>

            <div className="grid grid-cols-1 gap-2 pt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${isActive ? 'bg-[#002B5B] text-white shadow-xl' : 'text-gray-500 hover:bg-gray-50'}`
                  }
                >
                  {link.name}
                  <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
                </NavLink>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100 mt-4">
              {user ? (
                <button 
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-red-50 text-red-600 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Secure Logout
                </button>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-[#002B5B] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs block text-center shadow-xl shadow-blue-900/20 active:scale-[0.98]"
                >
                  Partner Portal Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
