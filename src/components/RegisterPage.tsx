import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail, Lock, User, Activity, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface RegisterPageProps {
  initialMode?: "login" | "register" | "staff_login";
  onAuth: (data: any) => void;
  onBack: () => void;
}

export default function RegisterPage({ initialMode = "register", onAuth, onBack }: RegisterPageProps) {
  const [mode, setMode] = useState<"login" | "register" | "staff_login">(initialMode);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError(null);
    if (mode === "register") {
      toast.success("Account created successfully!");
    } else if (mode === "staff_login") {
      toast.success("Staff access granted.");
    } else {
      toast.success("Welcome back!");
    }
    onAuth({ ...formData, isStaff: mode === "staff_login" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-950 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-white">CarWise AI</span>
          </div>
          
          <h1 className="font-display text-6xl text-white italic leading-tight mb-6">
            Unlock Decision <br /> Intelligence.
          </h1>
          <p className="text-zinc-400 max-w-md font-light leading-relaxed">
            Join thousands of smart buyers using deductive logic to verify vehicle integrity before they buy.
          </p>
        </div>

        <div className="relative z-10 flex gap-8">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Active Scans</span>
            <span className="text-white font-serif text-2xl italic">14,202</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Success Rate</span>
            <span className="text-white font-serif text-2xl italic">99.8%</span>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <button 
            onClick={onBack}
            className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-8 hover:text-zinc-900 transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-3 h-3 rotate-180" />
            Back to Home
          </button>

          <h2 className="font-display text-4xl text-zinc-900 mb-2">
            {mode === "register" ? "Create Account" : mode === "staff_login" ? "Staff Portal" : "Welcome Back"}
          </h2>
          <p className="text-zinc-500 mb-8 font-light">
            {mode === "register" 
              ? "Enter your details to start your first diagnostic scan." 
              : mode === "staff_login"
                ? "Secure access for authorized personnel only."
                : "Enter your credentials to access your account."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "register" && (
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>
            )}

            <div className="space-y-2">
              <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-12 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-12 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && <p className="text-rose-500 text-xs mt-2 ml-1">{passwordError}</p>}
            </div>
            )}

            <button 
              type="submit"
              className={`w-full text-white rounded-2xl py-4 font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group ${
                mode === "staff_login" ? "bg-emerald-900 hover:bg-emerald-800" : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {mode === "register" ? "Initialize Account" : mode === "staff_login" ? "Authenticate Staff" : "Access Account"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {mode !== "staff_login" && (
            <div className="mt-6 text-center">
              <button 
                type="button" 
                onClick={() => {
                  setMode(mode === "register" ? "login" : "register");
                  setPasswordError(null);
                }} 
                className="font-mono text-[10px] text-zinc-500 hover:text-zinc-900 uppercase tracking-widest transition-colors"
              >
                {mode === "register" ? "Already have an account? Log in" : "Need an account? Create one"}
              </button>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider">
              Your data is encrypted using military-grade protocols. We never share your personal information.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
