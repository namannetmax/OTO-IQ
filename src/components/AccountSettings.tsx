import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, CreditCard, ArrowLeft, Save } from "lucide-react";
import StripeBillingPortalMock from "./StripeBillingPortalMock";
import { toast } from "sonner";

interface AccountSettingsProps {
  onBack: () => void;
  currentUserEmail: string;
  userPlan: "free" | "pro";
}

export default function AccountSettings({ onBack, currentUserEmail, userPlan }: AccountSettingsProps) {
  const [email, setEmail] = useState(currentUserEmail || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showBillingPortal, setShowBillingPortal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDialog, setActiveDialog] = useState<null | "email" | "password">(null);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempCurrentPassword, setTempCurrentPassword] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [tempConfirmPassword, setTempConfirmPassword] = useState("");

  const handleEmailChange = () => {
    if (!tempCurrentPassword) {
      setError("Current password is required to change email.");
      return;
    }
    setEmail(tempEmail);
    setActiveDialog(null);
    setTempCurrentPassword("");
    setError(null);
    toast.success("Email address updated successfully.");
  };

  const handlePasswordChange = () => {
    if (!tempCurrentPassword) {
      setError("Current password is required to change password.");
      return;
    }
    if (tempPassword !== tempConfirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (tempPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    setPassword(tempPassword);
    setConfirmPassword(tempConfirmPassword);
    setCurrentPassword(tempCurrentPassword);
    setActiveDialog(null);
    setTempCurrentPassword("");
    setTempPassword("");
    setTempConfirmPassword("");
    setError(null);
    toast.success("Password updated successfully.");
  };

  const handleGoToBilling = () => {
    setShowBillingPortal(true);
  };

  return (
    <>
      <AnimatePresence>
        {showBillingPortal && (
          <StripeBillingPortalMock 
            onClose={() => setShowBillingPortal(false)}
            userEmail={currentUserEmail}
            currentPlan={userPlan}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActiveDialog(null);
                setError(null);
              }}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl">
                  {activeDialog === "email" ? "Change Email" : "Change Password"}
                </h3>
                <button 
                  onClick={() => {
                    setActiveDialog(null);
                    setError(null);
                  }}
                  className="text-zinc-400 hover:text-zinc-950 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 rotate-90" />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl font-mono text-[10px] uppercase tracking-wider">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {activeDialog === "email" ? (
                  <>
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                        New Email Address
                      </label>
                      <input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-violet-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                        Confirm with Password
                      </label>
                      <input
                        type="password"
                        value={tempCurrentPassword}
                        onChange={(e) => setTempCurrentPassword(e.target.value)}
                        placeholder="Current Password"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-violet-600"
                      />
                    </div>
                    <button
                      onClick={handleEmailChange}
                      className="w-full bg-violet-600 text-white py-4 rounded-xl font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20"
                    >
                      Update Email
                    </button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={tempCurrentPassword}
                        onChange={(e) => setTempCurrentPassword(e.target.value)}
                        placeholder="Verify current password"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-violet-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-violet-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={tempConfirmPassword}
                        onChange={(e) => setTempConfirmPassword(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-violet-600"
                      />
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      className="w-full bg-violet-600 text-white py-4 rounded-xl font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20"
                    >
                      Update Password
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-[#FCFCFC] rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 border border-zinc-200 p-12 mt-12"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl">Account Settings</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-950 transition-colors font-mono text-[10px] tracking-widest uppercase"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
      </div>

      <div className="space-y-8">
        {/* Email Address */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
              Email Address
            </label>
            <button 
              onClick={() => {
                setTempEmail(email);
                setActiveDialog("email");
              }}
              className="text-violet-600 font-mono text-[10px] uppercase tracking-widest font-bold hover:text-violet-700 transition-colors"
            >
              Change Email
            </button>
          </div>
          
          <div className="relative">
            <input
              type="email"
              value={email || ""}
              readOnly
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 font-mono text-sm focus:outline-none cursor-not-allowed opacity-70"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-zinc-400 pointer-events-none">
              <Lock className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Locked</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-100 my-8" />

        {/* Password Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
              Security
            </label>
            <button 
              onClick={() => setActiveDialog("password")}
              className="text-violet-600 font-mono text-[10px] uppercase tracking-widest font-bold hover:text-violet-700 transition-colors"
            >
              Change Password
            </button>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-zinc-400" />
              <span className="font-mono text-sm text-zinc-500">••••••••••••</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Encrypted</span>
          </div>
        </div>

        {/* Billing */}
        <div className="flex items-center justify-between border border-zinc-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <CreditCard className="w-6 h-6 text-zinc-400" />
            <span className="font-mono text-sm uppercase tracking-widest text-zinc-700">Billing Information</span>
          </div>
          <button
            onClick={handleGoToBilling}
            className="bg-zinc-100 text-zinc-600 px-4 py-2 rounded-lg font-mono text-[10px] tracking-widest uppercase font-bold hover:bg-zinc-200 transition-colors"
          >
            Manage
          </button>
        </div>
      </div>
    </motion.div>
    </>
  );
}
