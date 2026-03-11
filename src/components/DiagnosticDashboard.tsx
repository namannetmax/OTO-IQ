import { motion } from "motion/react";
import { Activity } from "lucide-react";

export default function DiagnosticDashboard() {
  return (
    <div className="relative w-full h-full bg-zinc-950 rounded-[2rem] overflow-hidden shadow-2xl p-6 grid grid-cols-1 grid-rows-1 gap-4 border border-white/5">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#3f3f46 1px, transparent 1px), linear-gradient(90deg, #3f3f46 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Main Diagnostic View (Center) */}
      <div className="col-span-1 row-span-1 bg-zinc-900/50 rounded-2xl border border-white/5 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="font-mono text-[8px] tracking-[0.2em] text-zinc-500 uppercase">Live Scan: active</span>
        </div>
        
        {/* Top-down Car Silhouette */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-[200px]"
        >
          <svg viewBox="0 0 100 200" className="w-full h-auto fill-none stroke-zinc-700 stroke-[0.5]">
            <path d="M20,40 C20,20 30,10 50,10 C70,10 80,20 80,40 L80,160 C80,180 70,190 50,190 C30,190 20,180 20,160 Z" />
            <path d="M25,50 L75,50 M25,150 L75,150" className="stroke-zinc-800" />
            <rect x="30" y="60" width="40" height="40" rx="2" className="stroke-zinc-800" />
            
            {/* Scanning Pulse */}
            <motion.circle
              cx="50"
              cy="100"
              r="0"
              animate={{ r: [0, 80], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="stroke-cyan-500/30"
            />
          </svg>
          
          {/* Hotspots */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
        </motion.div>

        <div className="absolute bottom-4 right-4 text-right">
          <div className="font-mono text-[10px] text-zinc-500 uppercase">Detection ID</div>
          <div className="font-mono text-xs text-white">#TRX-992-CAM</div>
        </div>
      </div>
    </div>
  );
}

