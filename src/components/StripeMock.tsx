import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CreditCard, ShieldCheck, Lock, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface StripeMockProps {
  onSuccess: () => void;
  onCancel: () => void;
  amount: string;
  item: string;
}

export default function StripeMock({ onSuccess, onCancel, amount, item }: StripeMockProps) {
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

  const handlePay = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-zinc-900">Secure Checkout</span>
          </div>
          <button onClick={onCancel} className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-widest">Cancel</span>
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">Purchasing</span>
                  <h3 className="font-serif text-2xl text-zinc-900">{item}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-serif italic text-violet-600">{amount}</span>
                    <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">USD</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest ml-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                      <input 
                        type="text" 
                        readOnly 
                        value="4242 4242 4242 4242" 
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-12 pr-4 font-mono text-sm text-zinc-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest ml-1">Expiry</label>
                      <input 
                        type="text" 
                        readOnly 
                        value="12/26" 
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 font-mono text-sm text-zinc-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest ml-1">CVC</label>
                      <input 
                        type="text" 
                        readOnly 
                        value="***" 
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 font-mono text-sm text-zinc-400"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePay}
                  className="w-full bg-zinc-900 text-white rounded-2xl py-4 mt-8 font-mono text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-zinc-900/20"
                >
                  Confirm Payment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-6 flex items-center justify-center gap-4 opacity-40 grayscale">
                  <ShieldCheck className="w-5 h-5" />
                  <Lock className="w-5 h-5" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em]">Stripe Secure</span>
                </div>
              </motion.div>
            )}

            {status === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="w-12 h-12 text-violet-600 animate-spin mb-6" />
                <h3 className="font-serif text-2xl mb-2">Processing Payment</h3>
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Verifying with your bank...</p>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-serif text-2xl mb-2">Payment Successful</h3>
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Unlocking Detailed Report...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
