import { motion, AnimatePresence } from "motion/react";
import { Search, ShieldCheck, Activity, BarChart3, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const STEPS = [
  {
    id: "ingest",
    label: "Data Ingestion",
    icon: Search,
    description: "Scanning 40+ global databases",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10"
  },
  {
    id: "audit",
    label: "History Audit",
    icon: ShieldCheck,
    description: "Verifying title & odometer",
    color: "text-violet-500",
    bg: "bg-violet-500/10"
  },
  {
    id: "deduce",
    label: "Mechanical Deduction",
    icon: Activity,
    description: "Identifying hidden wear patterns",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    id: "market",
    label: "Market Analysis",
    icon: BarChart3,
    description: "Benchmarking vs. 10k listings",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

export default function AnalysisProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        setIsComplete(true);
        clearInterval(timer);
        return prev;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-zinc-950 rounded-[2rem] overflow-hidden shadow-2xl p-8 flex items-center justify-center border border-white/5">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#3f3f46 1px, transparent 1px), linear-gradient(90deg, #3f3f46 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 w-full max-w-2xl aspect-square flex items-center justify-center">
        {/* Central Hub */}
        <div className="relative w-1/2 aspect-square rounded-full bg-zinc-900/50 border border-white/10 flex flex-col items-center justify-center shadow-2xl z-20 overflow-hidden">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center gap-4 p-8 text-center"
              >
                <div className="w-12 h-12 border-4 border-zinc-800 border-t-violet-600 rounded-full animate-spin" />
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Processing</div>
                  <div className="font-mono text-xs font-bold text-white uppercase">{STEPS[activeStep].label}</div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center p-8"
              >
                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-2">Reliability</div>
                <div className="relative mb-2">
                  <span className="font-serif text-7xl font-bold text-white italic">8.4</span>
                  <span className="absolute -top-1 -right-4 font-mono text-lg text-emerald-500">/10</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-[8px] tracking-widest uppercase">
                  <ShieldCheck className="w-3 h-3" />
                  High Confidence
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rotating Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full pointer-events-none"
          />
        </div>

        {/* Circular Steps */}
        <div className="absolute inset-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            
            // Calculate position on circle
            const angle = (index * (360 / STEPS.length)) - 90;
            const radius = 40; // percentage
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute"
                style={{ 
                  left: `${50 + x}%`, 
                  top: `${50 + y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative group">
                  {/* Connection Line to Center */}
                  <div 
                    className={`absolute top-1/2 left-1/2 w-32 h-px origin-left -translate-y-1/2 transition-colors duration-500 ${
                      isActive || isPast ? 'bg-gradient-to-r from-white/20 to-transparent' : 'bg-transparent'
                    }`}
                    style={{ transform: `rotate(${angle + 180}deg)` }}
                  />

                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-500 relative z-30 ${
                    isActive ? 'bg-zinc-900 border-white/20 shadow-2xl scale-110' : 
                    isPast ? 'bg-zinc-900/80 border-emerald-500/30' : 'bg-zinc-950 border-white/5 opacity-40'
                  }`}>
                    <Icon className={`w-6 h-6 ${isActive || isPast ? step.color : 'text-zinc-700'}`} />
                    
                    {isPast && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Tooltip-style Label */}
                  <div className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 text-center whitespace-nowrap transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="font-mono text-[10px] font-bold text-white uppercase tracking-widest">{step.label}</div>
                    <div className="font-mono text-[8px] text-zinc-500 uppercase">{step.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Logic Readout (Bottom) */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center font-mono text-[8px] tracking-[0.2em] text-zinc-600 uppercase">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-500" />
            <span>Logic: Circular Validation</span>
          </div>
        </div>
        <div>Scan ID: #CAM-882-CIRC</div>
      </div>
    </div>
  );
}
