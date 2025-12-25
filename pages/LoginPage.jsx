import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { Shield, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const API_URL = "http://localhost:3500";

const LoginPage = () => {
  const { login } = useOutletContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("data", data);

      if (!res.ok) {
        setErrorMsg(
          data.message ||
            "Login failed. Please verify your enterprise identity."
        );
        setIsLoading(false);
        return;
      }

      // Save logged-in user and token
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      // Call context login to update state across the app
      login(
        data.user || {
          name: email.split("@")[0],
          email: email,
          role: "Corporate User",
        }
      );

      // Redirect based on provided logic (or home)
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Server communication error. Please try again later.");
      setIsLoading(false);
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
          <h2 className="text-3xl font-extrabold text-[#002B5B] tracking-tight">
            Enterprise Access
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your corporate procurement account.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div className="relative">
              <label
                htmlFor="email-address"
                className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block ml-1"
              >
                Work Email
              </label>
              <div className="relative">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-xl relative block w-full px-4 py-3.5 pl-11 border border-gray-200 placeholder-gray-400 text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent transition-all sm:text-sm"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block ml-1"
              >
                Security Key
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-xl relative block w-full px-4 py-3.5 pl-11 border border-gray-200 placeholder-gray-400 text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#20B2AA] focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100 animate-pulse">
              {errorMsg}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#20B2AA] focus:ring-[#20B2AA] border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-xs text-gray-500 font-medium"
              >
                Keep session active
              </label>
            </div>

            <div className="text-xs">
              <a
                href="#"
                className="font-bold text-[#20B2AA] hover:text-teal-600"
              >
                Reset Credentials?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#002B5B] hover:bg-[#001f42]"
              } focus:outline-none transition-all shadow-xl shadow-[#002B5B]/20 active:scale-[0.98] items-center gap-2`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  Authorize Access <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
            <CheckCircle2 className="h-4 w-4 text-[#20B2AA]" /> Verified
            Security
          </div>
          <p className="text-center text-xs text-gray-400">
            New corporate partner?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[#20B2AA] font-bold hover:underline"
            >
              Register for procurement access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
