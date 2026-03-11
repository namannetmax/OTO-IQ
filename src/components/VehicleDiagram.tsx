import { motion } from "motion/react";
import { Activity, ShieldAlert, CheckCircle2, Zap } from "lucide-react";

export default function VehicleDiagram() {
  return (
    <div className="relative w-full h-full bg-zinc-950 rounded-[3rem] overflow-hidden shadow-2xl p-8 flex flex-col justify-center items-center group">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      {/* Real Car Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="relative w-full max-w-2xl aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop" 
            alt="Toyota Camry SE" 
            className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
          
          {/* Scanning Beam Animation */}
          <motion.div
            initial={{ left: "-10%" }}
            animate={{ left: "110%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1 bg-cyan-500/40 blur-[4px] z-20"
          />
          <motion.div
            initial={{ left: "-10%" }}
            animate={{ left: "110%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 z-20"
          />

          {/* Diagnostic Hotspots - Positioned over the real car image */}
          <Hotspot x="25%" y="40%" label="Engine Health" status="warning" delay={0.5} />
          <Hotspot x="60%" y="45%" label="Transmission" status="optimal" delay={0.8} />
          <Hotspot x="45%" y="75%" label="Chassis Integrity" status="optimal" delay={1.1} />
          <Hotspot x="15%" y="65%" label="Brake Wear" status="critical" delay={1.4} />
        </div>
      </motion.div>

      {/* Data Readout Overlay */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
        <div className="space-y-1">
          <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Analysis Confidence</div>
          <div className="font-mono text-2xl font-bold text-white">98.4%</div>
        </div>
        <div className="flex gap-2">
          <div className="w-1 h-8 bg-cyan-600/30 rounded-full overflow-hidden">
            <motion.div 
              animate={{ height: ["20%", "80%", "40%"] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full bg-cyan-500" 
            />
          </div>
          <div className="w-1 h-8 bg-cyan-600/30 rounded-full overflow-hidden">
            <motion.div 
              animate={{ height: ["60%", "30%", "90%"] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-full bg-cyan-500" 
            />
          </div>
          <div className="w-1 h-8 bg-cyan-600/30 rounded-full overflow-hidden">
            <motion.div 
              animate={{ height: ["40%", "70%", "20%"] }} 
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-full bg-cyan-500" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Hotspot({ x, y, label, status, delay }: { x: string, y: string, label: string, status: 'optimal' | 'warning' | 'critical', delay: number }) {
  const colors = {
    optimal: 'bg-cyan-500',
    warning: 'bg-yellow-500',
    critical: 'bg-rose-500'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute flex items-center gap-3 pointer-events-none"
      style={{ left: x, top: y }}
    >
      <div className={`w-3 h-3 rounded-full ${colors[status]} shadow-[0_0_10px_rgba(0,0,0,0.5)] relative`}>
        <div className={`absolute inset-0 rounded-full ${colors[status]} animate-ping opacity-75`} />
      </div>
      <div className="glass px-2 py-1 rounded-md border border-white/10">
        <span className="font-mono text-[8px] tracking-widest uppercase text-white whitespace-nowrap">{label}</span>
      </div>
    </motion.div>
  );
}
