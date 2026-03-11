import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2, Activity, Crown } from "lucide-react";
import StripeMock from "./StripeMock";

interface MockReportProps {
  vehicleData: any;
  onBack: () => void;
  plan: "free" | "pro";
  reports: any[];
  onUpgradeReport: (reportId: number) => void;
}

export default function MockReport({ vehicleData, onBack, plan, reports, onUpgradeReport }: MockReportProps) {
  const [isDetailedOverride, setIsDetailedOverride] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  const [stripeConfig, setStripeConfig] = useState({ amount: "", item: "" });

  const isDetailed = vehicleData.type === "Detailed" || isDetailedOverride;
  const detailedCount = reports.filter(r => r.type === "Detailed").length;

  const handlePaymentSuccess = () => {
    setShowStripe(false);
    setIsDetailedOverride(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 grid-pattern pb-20">
      <AnimatePresence>
        {showStripe && (
          <StripeMock 
            amount={stripeConfig.amount}
            item={stripeConfig.item}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowStripe(false)}
          />
        )}
      </AnimatePresence>
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center rounded-lg">
              <Activity className="w-5 h-5 text-cyan-600" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-xl">CARWISE<span className="text-violet-600">AI</span></span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button 
            onClick={onBack}
            className="mb-12 flex items-center gap-2 text-zinc-400 hover:text-zinc-950 transition-colors font-mono text-[10px] tracking-widest uppercase"
          >
            <ArrowLeft className="w-3 h-3" />
            Return to Dashboard
          </button>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 font-mono text-[10px] tracking-widest uppercase mb-4">
                {isDetailed ? "Detailed Diagnostic Report" : "Basic Report"}
              </div>
              <h1 className="font-display text-5xl tracking-tight mb-2 uppercase">
                {vehicleData.year || "2021"} {vehicleData.make || "Toyota"} {vehicleData.model || "Camry"}
              </h1>
              <div className="flex gap-4 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                <span>{vehicleData.odometer || "60,000"} MILES</span>
                <span>•</span>
                <span>${vehicleData.price || "15,000"}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-2">Reliability Score</span>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-7xl font-bold text-zinc-900 italic tracking-tighter">8.4</span>
                <span className="font-mono text-lg text-emerald-500 font-bold">/10</span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Structural */}
            <div className="bg-[#FCFCFC] p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-mono text-sm tracking-widest uppercase font-bold">Structural</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>No frame damage reported</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Factory paint thickness verified</span>
                </li>
                {isDetailed && (
                  <li className="flex items-start gap-3 text-sm text-zinc-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Panel alignment within spec</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Mechanical */}
            <div className="bg-[#FCFCFC] p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-mono text-sm tracking-widest uppercase font-bold">Mechanical</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Engine timing normal</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-600">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Transmission fluid aging</span>
                </li>
                {isDetailed && (
                  <li className="flex items-start gap-3 text-sm text-zinc-600">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Brake pads at 40% life</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Financial */}
            <div className="bg-[#FCFCFC] p-8 rounded-3xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-mono text-sm tracking-widest uppercase font-bold">Financial</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Priced 5% below market avg</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Clean title history</span>
                </li>
                {isDetailed && (
                  <li className="flex items-start gap-3 text-sm text-zinc-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Low projected depreciation</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Detailed Sections */}
          {isDetailed && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="space-y-6 mt-12"
            >
              <div className="bg-zinc-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Activity className="w-64 h-64 text-violet-600" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl italic">AI Deductive Insights</h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Advanced Pattern Recognition</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-violet-400 mb-3">Usage Pattern Deduction</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          Based on odometer progression and wear patterns, this vehicle was likely used for long-distance highway commuting. Engine idle hours are lower than average for this mileage.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-3">Maintenance Integrity</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          Consistent service intervals detected. Fluid analysis suggests high-quality synthetic oils were used throughout the vehicle's life cycle.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Engine Health Index</span>
                          <span className="font-serif text-xl italic text-emerald-400">96%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "96%" }} 
                            className="h-full bg-emerald-400" 
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Transmission Stability</span>
                          <span className="font-serif text-xl italic text-amber-400">82%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "82%" }} 
                            className="h-full bg-amber-400" 
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Electrical System Integrity</span>
                          <span className="font-serif text-xl italic text-emerald-400">91%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "91%" }} 
                            className="h-full bg-emerald-400" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#FCFCFC] p-8 rounded-3xl border border-zinc-200 shadow-sm">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-6 text-zinc-400">Predictive Maintenance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <span className="text-sm font-medium">Spark Plugs</span>
                      <span className="font-mono text-[10px] text-zinc-500">IN 12,000 MI</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <span className="text-sm font-medium">Coolant Flush</span>
                      <span className="font-mono text-[10px] text-zinc-500">IN 5,500 MI</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <span className="text-sm font-medium">Tire Rotation</span>
                      <span className="font-mono text-[10px] text-rose-500 font-bold">OVERDUE</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FCFCFC] p-8 rounded-3xl border border-zinc-200 shadow-sm">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-6 text-zinc-400">Market Analysis</h3>
                  <div className="space-y-6">
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      This specific trim and color combination is currently in high demand. Resale value is expected to remain stable over the next 24 months.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <span className="block font-mono text-[10px] text-zinc-400 uppercase mb-1">Demand Index</span>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full w-[88%] bg-violet-600" />
                          </div>
                          <span className="font-mono text-xs font-bold">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!isDetailed && (
            <div className="bg-zinc-950 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-display text-2xl mb-2">Unlock the Full Picture</h4>
                <p className="text-zinc-400 text-sm max-w-md">
                  {plan === "pro" 
                    ? `Use one of your 50 detailed reports to reveal 40+ additional data points. You have ${50 - detailedCount} remaining.`
                    : "Upgrade to a detailed report to reveal 40+ additional data points, including deep mechanical deductions and predictive failure analysis."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
                {plan === "pro" ? (
                  <button 
                    onClick={() => onUpgradeReport(vehicleData.id)}
                    className="w-full sm:w-auto bg-violet-600 text-white px-8 py-3 rounded-xl font-mono text-xs tracking-widest uppercase font-bold hover:bg-violet-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Upgrade Report
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setStripeConfig({ amount: "$9", item: "Detailed Diagnostic Report Upgrade" });
                        setShowStripe(true);
                      }}
                      className="w-full sm:w-auto bg-violet-600 text-white px-6 py-3 rounded-xl font-mono text-xs tracking-widest uppercase font-bold hover:bg-violet-700 transition-colors text-center"
                    >
                      Upgrade for $9
                    </button>
                    <button 
                      onClick={() => {
                        setStripeConfig({ amount: "$49", item: "Advance Monthly Subscription" });
                        setShowStripe(true);
                      }}
                      className="w-full sm:w-auto bg-white text-zinc-950 px-6 py-3 rounded-xl font-mono text-xs tracking-widest uppercase font-bold hover:bg-zinc-100 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      Subscribe ($49/mo)
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
