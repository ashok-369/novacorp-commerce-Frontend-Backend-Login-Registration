
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useOutletContext } from "react-router-dom";
import { User, Mail, Phone, Edit3, Trash2, ArrowLeft, ShieldCheck, CheckCircle2, Save, X } from 'lucide-react';

const UPDATE_URL = "http://localhost:3500/users"; 
const DELETE_URL = "http://localhost:3500/users";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, login: updateContextUser, logout } = useOutletContext();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");

    if (!token || !storedUserStr) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUserStr);
    const loggedInUserId = parsedUser._id || parsedUser.id;

    if (loggedInUserId !== id) {
      // If trying to access another profile, redirect to own profile or home
      navigate(`/profile/${loggedInUserId}`);
      return;
    }

    setUser(parsedUser);
    setFormData({
      name: parsedUser.name,
      email: parsedUser.email,
      phone: parsedUser.phone || "",
    });
    setLoading(false);
  }, [id, navigate, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const userId = user?._id || user?.id; 
    if (!userId) {
      alert("Invalid user ID. Please login again.");
      return;
    }

    try {
      const res = await fetch(`${UPDATE_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update global context so header updates
      updateContextUser(updatedUser);

      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your enterprise account? This action cannot be undone."))
      return;

    try {
      const res = await fetch(`${DELETE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      localStorage.clear();
      logout(); // Use context logout to clear state
      alert("Account deleted successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-gray-400 font-bold mb-8 hover:text-[#002B5B] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Cover/Header */}
          <div className="h-32 bg-gradient-to-r from-[#002B5B] to-[#20B2AA] relative">
            <div className="absolute -bottom-12 left-10 p-1 bg-white rounded-2xl shadow-lg">
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-[#002B5B]">
                <User className="w-12 h-12" />
              </div>
            </div>
          </div>

          <div className="pt-16 pb-10 px-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-[#002B5B] tracking-tight">{user.name}</h1>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-[#20B2AA]" /> Corporate Account ID: {id?.slice(-6) || 'N/A'}
                </p>
              </div>
              {!editMode && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 bg-gray-50 text-gray-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all border border-gray-200"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100"
                  >
                    <Trash2 className="w-4 h-4" /> Terminate
                  </button>
                </div>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {editMode ? (
                <div className="md:col-span-2 space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Identity</label>
                      <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#20B2AA] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                      <input 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#20B2AA] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Secure Line</label>
                      <input 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#20B2AA] outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={handleUpdate} 
                      className="flex items-center gap-2 bg-[#20B2AA] text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20"
                    >
                      <Save className="w-4 h-4" /> Commit Changes
                    </button>
                    <button 
                      onClick={() => setEditMode(false)} 
                      className="flex items-center gap-2 bg-white text-gray-400 px-8 py-3 rounded-xl font-bold hover:text-gray-600 transition-all border border-gray-200"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#20B2AA] shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                      <p className="text-[#002B5B] font-bold">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#20B2AA] shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Phone</p>
                      <p className="text-[#002B5B] font-bold">{user.phone || "Not Provisioned"}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-12 p-8 bg-[#002B5B] rounded-3xl text-white relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="space-y-1">
                   <h3 className="text-xl font-bold flex items-center gap-2">
                     <CheckCircle2 className="text-[#20B2AA]" /> Verified Partner
                   </h3>
                   <p className="text-blue-100/60 text-sm">Your account has full access to enterprise-tier pricing and procurement tools.</p>
                 </div>
                 <Link to="/products" className="bg-[#20B2AA] text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all whitespace-nowrap shadow-xl shadow-black/20">
                    Browse Catalog
                 </Link>
               </div>
               <div className="absolute right-0 top-0 -mr-10 -mt-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
