
import React, { useState } from 'react';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import { Shield, User, Mail, Phone, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const API_URL = "http://localhost:3500";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useOutletContext();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Validation Logic from user snippet
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (!/^[a-zA-Z\s]{2,50}$/.test(value))
          return "Name should be 2–50 letters only";
        break;
      case "phone":
        if (!value.trim()) return "Phone is required";
        if (!/^\+?[0-9]{7,15}$/.test(value))
          return "Enter a valid phone number";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6)
          return "Password must be at least 6 characters";
        break;
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setSuccessMsg("");
    setErrorMsg("");
  };

  const checkUserExists = async (field, value) => {
    if (!value) return;
    try {
      const res = await fetch(`${API_URL}/check-user?${field}=${value}`);
      const data = await res.json();
      if (data.exists) {
        setErrors((prev) => ({
          ...prev,
          [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
        }));
      }
    } catch (err) {
      console.error("Check user error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const validationErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) validationErrors[key] = err;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Registration failed. Please check your details.");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user);
        navigate("/"); 
        return;
      }

      setSuccessMsg("Registration successful! Redirecting to login...");
      setForm(initialForm);
      setErrors({});

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Register error:", error);
      setErrorMsg("Connection error. Please ensure the authentication server is reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#20B2AA]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#002B5B]/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative z-10">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-[#002B5B] text-white shadow-lg mb-6">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#002B5B] tracking-tight">Partner Enrollment</h2>
          <p className="mt-2 text-sm text-gray-500">
            Provision your enterprise account for global procurement.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Identity</label>
            <div className="relative">
              <input
                name="name"
                type="text"
                placeholder="Sarah Sterling"
                value={form.name}
                onChange={handleChange}
                onBlur={() => checkUserExists("name", form.name)}
                className={`w-full px-4 py-3.5 pl-11 rounded-xl border ${errors.name ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all text-sm`}
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
          </div>

          {/* Phone Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Direct Line</label>
            <div className="relative">
              <input
                name="phone"
                type="tel"
                placeholder="+1 555 0123"
                value={form.phone}
                onChange={handleChange}
                onBlur={() => checkUserExists("phone", form.phone)}
                className={`w-full px-4 py-3.5 pl-11 rounded-xl border ${errors.phone ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all text-sm`}
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Work Correspondence</label>
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="procurement@sterling.com"
                value={form.email}
                onChange={handleChange}
                onBlur={() => checkUserExists("email", form.email)}
                className={`w-full px-4 py-3.5 pl-11 rounded-xl border ${errors.email ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all text-sm`}
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">System Credentials</label>
            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 pl-11 rounded-xl border ${errors.password ? 'border-red-300 ring-1 ring-red-100' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all text-sm`}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#002B5B] hover:bg-slate-900'} transition-all shadow-xl shadow-blue-900/10 active:scale-95 items-center gap-2`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Enrollment...
                </>
              ) : (
                <>
                  Request Enrollment <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {successMsg && (
            <div className="bg-green-50 text-green-700 text-xs font-bold p-4 rounded-xl flex items-center gap-3 border border-green-100">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-xs font-bold p-4 rounded-xl flex items-center gap-3 border border-red-100">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {errorMsg}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Existing corporate partner? <Link to="/login" className="text-[#20B2AA] font-bold hover:underline ml-1">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
