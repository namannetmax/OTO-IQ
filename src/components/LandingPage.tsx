import { motion } from "motion/react";
import { Car, ShieldCheck, FileText, ArrowRight, Activity, Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface LandingPageProps {
  onNavigateToRegister: () => void;
  onNavigateToLogin: () => void;
  onNavigateToStaffLogin: () => void;
}

export default function LandingPage({ onNavigateToRegister, onNavigateToLogin, onNavigateToStaffLogin }: LandingPageProps) {

  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-violet-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center rounded-lg">
              <Activity className="w-5 h-5 text-cyan-600" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-xl">CARWISE<span className="text-violet-600">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase text-zinc-500">
            <a href="#features" className="hover:text-zinc-950 transition-colors">Methodology</a>
            <a href="#pricing" className="hover:text-zinc-950 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateToLogin}
              className="hidden md:block font-mono text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-950 transition-colors font-bold"
            >
              Log In
            </button>
            <button 
              onClick={onNavigateToRegister}
              className="bg-violet-600 text-white px-5 py-2 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/10 active:scale-95"
            >
              Start Analysis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden grid-pattern">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 font-mono text-[10px] tracking-widest uppercase mb-6">
                <Zap className="w-3 h-3 fill-current" />
                Used Car Decision Intelligence
              </div>
              <h1 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tight mb-8">
                Don't Buy a <br />
                <span className="italic text-zinc-400">Hidden Disaster.</span>
              </h1>
              <p className="text-xl text-zinc-600 max-w-2xl mb-10 leading-relaxed">
                CarWise AI uses professional-grade diagnostic logic to analyze vehicle history, mechanical data, and market trends. Get the authority of a specialist before you sign.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-20">
                <button 
                  onClick={onNavigateToRegister}
                  className="bg-violet-600 text-white px-8 py-4 rounded-2xl font-mono text-sm tracking-widest uppercase hover:bg-violet-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-violet-600/20 group"
                >
                  Analyze a Vehicle
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-violet-600 font-bold mb-4 block">01 / METHODOLOGY</span>
            <h2 className="font-display text-5xl tracking-tight">Used Car Analysis <br />at your fingertips.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-3xl overflow-hidden">
            <div className="bg-[#FCFCFC] p-12 hover:bg-zinc-50 transition-colors">
              <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-8 border border-zinc-100">
                <FileText className="w-6 h-6 text-zinc-950" />
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase font-bold mb-4">Deduction Logic</h3>
              <p className="text-zinc-500 leading-relaxed">Our AI doesn't just scrape data; it applies mechanical deduction to identify inconsistencies in service records and odometer readings.</p>
            </div>
            <div className="bg-[#FCFCFC] p-12 hover:bg-zinc-50 transition-colors">
              <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-8 border border-zinc-100">
                <ShieldCheck className="w-6 h-6 text-zinc-950" />
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase font-bold mb-4">Risk Architecture</h3>
              <p className="text-zinc-500 leading-relaxed">We categorize risks into Structural, Mechanical, and Financial, giving you a clear blueprint of what you're buying into.</p>
            </div>
            <div className="bg-[#FCFCFC] p-12 hover:bg-zinc-50 transition-colors">
              <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-8 border border-zinc-100">
                <Car className="w-6 h-6 text-zinc-950" />
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase font-bold mb-4">Market Precision</h3>
              <p className="text-zinc-500 leading-relaxed">Real-time analysis of thousands of similar listings to tell you exactly if the price reflects the vehicle's true condition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-violet-600 font-bold mb-4 block">02 / PRICING</span>
            <h2 className="font-display text-5xl tracking-tight">Scalable Intelligence.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-[#FCFCFC] p-10 rounded-3xl border border-zinc-200 shadow-sm flex flex-col">
              <h3 className="font-mono text-sm tracking-widest uppercase font-bold mb-2">Basic</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-serif text-5xl tracking-tight">$0</span>
                <span className="text-zinc-500 font-mono text-xs">/mo</span>
              </div>
              <p className="text-zinc-500 text-sm mb-8">For buyers needing a quick, basic check.</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-zinc-600"><CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0" /> 3 reports per month</li>
                <li className="flex items-start gap-3 text-sm text-zinc-600"><CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0" /> Basic analysis</li>
                <li className="flex items-start gap-3 text-sm text-zinc-600"><CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0" /> Basic risk categorization</li>
              </ul>
              <button 
                onClick={onNavigateToRegister}
                className="w-full py-3 rounded-xl border border-zinc-200 font-mono text-xs tracking-widest uppercase hover:bg-zinc-50 transition-colors font-bold"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-zinc-950 text-white p-10 rounded-3xl border border-zinc-800 shadow-xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-violet-600 text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full font-bold">Recommended</span>
              </div>
              <h3 className="font-mono text-sm tracking-widest uppercase font-bold mb-2 text-zinc-400">Advance</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-serif text-5xl tracking-tight">$49</span>
                <span className="text-zinc-500 font-mono text-xs">/mo</span>
              </div>
              <p className="text-zinc-400 text-sm mb-8">For active buyers exploring multiple vehicles.</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-zinc-300"><CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" /> 50 reports per month</li>
                <li className="flex items-start gap-3 text-sm text-zinc-300"><CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" /> Detailed comprehensive reports</li>
                <li className="flex items-start gap-3 text-sm text-zinc-300"><CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" /> Full mechanical deduction</li>
              </ul>
              <button 
                onClick={onNavigateToRegister}
                className="w-full py-3 rounded-xl bg-violet-600 font-mono text-xs tracking-widest uppercase hover:bg-violet-700 transition-colors font-bold"
              >
                Start Advance
              </button>
            </div>

            {/* On-Demand Plan */}
            <div className="bg-[#FCFCFC] p-10 rounded-3xl border border-zinc-200 shadow-sm flex flex-col">
              <h3 className="font-mono text-sm tracking-widest uppercase font-bold mb-2">On-Demand</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-serif text-5xl tracking-tight">$9</span>
                <span className="text-zinc-500 font-mono text-xs">/report</span>
              </div>
              <p className="text-zinc-500 text-sm mb-8">Pay as you go for deep insights.</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-zinc-600"><CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0" /> Upgrade basic to detailed</li>
                <li className="flex items-start gap-3 text-sm text-zinc-600"><CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0" /> Extra detailed reports after 50/mo</li>
                <li className="flex items-start gap-3 text-sm text-zinc-600"><CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0" /> No monthly commitment</li>
              </ul>
              <button 
                onClick={onNavigateToRegister}
                className="w-full py-3 rounded-xl border border-zinc-200 font-mono text-xs tracking-widest uppercase hover:bg-zinc-50 transition-colors font-bold"
              >
                Start On-Demand
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-end border-b border-zinc-800 pb-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Activity className="w-6 h-6 text-cyan-600" />
                <span className="font-mono font-bold tracking-tighter text-2xl uppercase">CARWISE<span className="text-violet-600">AI</span></span>
              </div>
              <p className="text-zinc-500 max-w-sm font-mono text-xs leading-relaxed uppercase tracking-wider">
                Professional automotive risk architecture for the modern buyer. Built for precision, designed for authority.
              </p>
            </div>
            <div className="flex gap-12 font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
              <div className="space-y-4">
                <div className="text-white font-bold">Product</div>
                <a href="#" className="block hover:text-white transition-colors">Methodology</a>
                <a href="#" className="block hover:text-white transition-colors">API</a>
              </div>
              <div className="space-y-4">
                <div className="text-white font-bold">Company</div>
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] tracking-widest uppercase text-zinc-600">
            <div>© 2026 CARWISE AI DIAGNOSTICS. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8">
              <button onClick={onNavigateToStaffLogin} className="hover:text-white transition-colors">Staff Login</button>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
