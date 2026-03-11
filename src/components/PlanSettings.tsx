import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crown, Check, ArrowLeft, Shield, Zap, Star } from "lucide-react";
import StripeMock from "./StripeMock";
import { toast } from "sonner";

interface PlanSettingsProps {
  onBack: () => void;
  currentPlan: "free" | "pro";
  downgradePending: boolean;
  planExpiryDate: string | null;
  onUpdatePlan: (plan: "free" | "pro", isDowngrade?: boolean) => void;
}

export default function PlanSettings({ onBack, currentPlan, downgradePending, planExpiryDate, onUpdatePlan }: PlanSettingsProps) {
  const [showStripe, setShowStripe] = useState(false);
  const [showConfirmDowngrade, setShowConfirmDowngrade] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<"free" | "pro" | null>(null);

  const plans = [
    {
      id: "free",
      name: "Essential",
      price: "$0",
      period: "forever",
      description: "Perfect for casual buyers verifying a single vehicle.",
      features: [
        "3 Basic Diagnostic Reports",
        "Image Upload Analysis",
        "CarFax Report Integration",
        "Standard Support"
      ],
      icon: <Zap className="w-5 h-5" />,
      buttonText: currentPlan === "free" ? "Current Plan" : (downgradePending ? "Downgrade Scheduled" : "Downgrade to Essential"),
      disabled: currentPlan === "free" || downgradePending
    },
    {
      id: "pro",
      name: "Advance",
      price: "$49",
      period: "per month",
      description: "For professional buyers and enthusiasts managing a garage.",
      features: [
        "Unlimited Detailed Reports",
        "AI Deductive Insights",
        "Predictive Maintenance Logs",
        "Market Demand Analysis",
        "Priority 24/7 Support",
        "Multi-device Sync"
      ],
      icon: <Star className="w-5 h-5" />,
      buttonText: currentPlan === "pro" ? "Current Plan" : "Upgrade to Advance",
      highlight: true
    }
  ];

  const handlePlanAction = (planId: "free" | "pro") => {
    if (planId === currentPlan) return;
    
    if (planId === "pro") {
      setPendingPlan("pro");
      setShowStripe(true);
    } else {
      // Downgrade flow
      setShowConfirmDowngrade(true);
    }
  };

  const confirmDowngrade = () => {
    setShowConfirmDowngrade(false);
    onUpdatePlan("free", true);
    toast.info("Downgrade scheduled for the end of your billing cycle.");
  };

  const handlePaymentSuccess = () => {
    setShowStripe(false);
    if (pendingPlan) {
      onUpdatePlan(pendingPlan);
      setPendingPlan(null);
      toast.success("Successfully upgraded to Advance plan!");
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <AnimatePresence>
        {showStripe && (
          <StripeMock 
            amount="$49"
            item="Advance Monthly Subscription"
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowStripe(false)}
          />
        )}
        
        {showConfirmDowngrade && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-950/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-zinc-200"
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-display text-3xl mb-4 italic">Confirm Downgrade</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Your Advance features will remain active until the end of your current billing cycle. After that, you will lose access to detailed reports and AI insights.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={confirmDowngrade}
                  className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-mono text-xs tracking-widest uppercase font-bold hover:bg-zinc-800 transition-all"
                >
                  Confirm Downgrade
                </button>
                <button 
                  onClick={() => setShowConfirmDowngrade(false)}
                  className="w-full py-4 bg-zinc-100 text-zinc-500 rounded-2xl font-mono text-xs tracking-widest uppercase font-bold hover:bg-zinc-200 transition-all"
                >
                  Keep Advance Plan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-zinc-400 hover:text-zinc-950 transition-colors font-mono text-[10px] tracking-widest uppercase"
        >
          <ArrowLeft className="w-3 h-3" />
          Return to Dashboard
        </button>

        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-violet-100 text-violet-600 font-mono text-[10px] tracking-widest uppercase mb-6">
            Subscription Management
          </div>
          <h1 className="font-display text-5xl tracking-tight mb-4 italic">Choose Your Intelligence Level</h1>
          <p className="text-zinc-500 font-mono text-xs tracking-wider uppercase max-w-xl mx-auto">
            Scale your diagnostic capabilities based on your needs. Upgrade anytime to unlock deep deductive logic.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-[#FCFCFC] rounded-[2.5rem] p-10 border transition-all duration-500 ${
                plan.highlight 
                  ? "border-violet-200 shadow-2xl shadow-violet-600/5 ring-1 ring-violet-100" 
                  : "border-zinc-200 shadow-sm"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-4 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase font-bold shadow-lg shadow-violet-600/20">
                  Recommended
                </div>
              )}

              <div className="flex justify-between items-start mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  plan.highlight ? "bg-violet-600 text-white" : "bg-zinc-100 text-zinc-900"
                }`}>
                  {plan.icon}
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="font-serif text-4xl italic font-bold">{plan.price}</span>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">{plan.period}</span>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-3xl mb-2 italic">{plan.name}</h3>
              <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{plan.description}</p>

              {plan.id === "pro" && downgradePending && planExpiryDate && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold mb-1">Downgrade Scheduled</p>
                  <p className="text-[10px] font-mono text-amber-600">Your Advance features will expire on <span className="font-bold">{planExpiryDate}</span>.</p>
                </div>
              )}

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      plan.highlight ? "bg-violet-100 text-violet-600" : "bg-zinc-100 text-zinc-400"
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-zinc-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handlePlanAction(plan.id as "free" | "pro")}
                disabled={plan.id === currentPlan || (plan.id === "free" && downgradePending)}
                className={`w-full py-4 rounded-2xl font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all ${
                  plan.id === currentPlan || (plan.id === "free" && downgradePending)
                    ? "bg-zinc-100 text-zinc-400 cursor-default"
                    : plan.highlight
                      ? "bg-violet-600 text-white hover:bg-violet-700 shadow-xl shadow-violet-600/20"
                      : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/20"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-zinc-950 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8b5cf6 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10">
            <Shield className="w-12 h-12 text-violet-500 mx-auto mb-6" />
            <h4 className="text-white font-display text-2xl mb-2 italic">Enterprise Grade Security</h4>
            <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8">
              All transactions are encrypted and processed by Stripe. We do not store your credit card information.
            </p>
            <div className="flex items-center justify-center gap-8 opacity-30 grayscale invert">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
