import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Check, X, AlertTriangle, Gauge, DollarSign, Calendar, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface ReportComparisonProps {
  reports: any[];
  onBack: () => void;
}

export default function ReportComparison({ reports, onBack }: ReportComparisonProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    toast.info(`Comparing ${reports.length} vehicles.`);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
      });
    }
  };

  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500";
    if (score >= 70) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-7xl mx-auto py-6 px-4"
    >
      <button 
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-zinc-500 hover:text-zinc-950 transition-colors font-mono text-[10px] tracking-widest uppercase"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to Dashboard
      </button>

      <div className="text-center mb-6">
        <h1 className="font-display text-2xl tracking-tight mb-1 italic">Vehicle Comparison Matrix</h1>
        <p className="text-zinc-600 font-mono text-[9px] tracking-wider uppercase max-w-xl mx-auto">
          Side-by-side comparison of vehicle risk factors.
        </p>
      </div>

      <div className="relative group">
        {reports.length > 2 && (
          <>
            <button 
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white border border-zinc-200 p-1.5 rounded-full shadow-lg hover:bg-zinc-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-zinc-700" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white border border-zinc-200 p-1.5 rounded-full shadow-lg hover:bg-zinc-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
            </button>
          </>
        )}

        <div className="p-1 pb-2">
          <div 
            ref={scrollContainerRef} 
            className="w-full max-h-[80vh] overflow-auto scroll-smooth bg-white rounded-[1.5rem] shadow-lg border border-zinc-200"
          >
            <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="p-3 text-left w-40 bg-zinc-50 sticky top-0 z-20 shadow-sm">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-500 font-bold">Metric</span>
                </th>
                {reports.map((report) => (
                  <th key={report.id} className="p-3 text-left min-w-[160px] bg-white sticky top-0 z-20 shadow-sm">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-display text-base italic leading-tight text-zinc-900">{report.year} {report.make}</span>
                      <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-500">{report.model}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {/* Overall Score */}
              <tr>
                <td className="p-3 bg-zinc-50/50">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-zinc-500" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-700">AI Score</span>
                  </div>
                </td>
                {reports.map((report) => (
                  <td key={report.id} className="p-3">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-display text-xl font-bold italic ${getScoreColor(report.score)}`}>
                        {report.score}
                      </span>
                      <span className="text-zinc-400 font-mono text-[9px] uppercase">/ 100</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Price Analysis */}
              <tr>
                <td className="p-3 bg-zinc-50/50">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3 text-zinc-500" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-700">Market Value</span>
                  </div>
                </td>
                {reports.map((report) => (
                  <td key={report.id} className="p-3">
                    <div className="font-mono text-[10px] font-medium text-zinc-900">
                      {/* Mock price logic based on score for demo */}
                      ${(15000 + (report.score * 100)).toLocaleString()}
                    </div>
                    <div className="mt-0.5 inline-flex items-center gap-1 px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[8px] font-mono uppercase font-bold">
                      <Check className="w-2 h-2" /> Fair Price
                    </div>
                  </td>
                ))}
              </tr>

              {/* Mileage */}
              <tr>
                <td className="p-3 bg-zinc-50/50">
                  <div className="flex items-center gap-1.5">
                    <Gauge className="w-3 h-3 text-zinc-500" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-700">Mileage</span>
                  </div>
                </td>
                {reports.map((report) => (
                  <td key={report.id} className="p-3">
                    <div className="font-mono text-[10px] font-medium text-zinc-900">
                      {/* Mock mileage logic */}
                      {(120000 - (report.score * 800)).toLocaleString()} mi
                    </div>
                    <div className="mt-0.5 text-[8px] text-zinc-500 font-mono">
                      ~12k mi/year avg
                    </div>
                  </td>
                ))}
              </tr>

              {/* Vehicle Age */}
              <tr>
                <td className="p-3 bg-zinc-50/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-700">Vehicle Age</span>
                  </div>
                </td>
                {reports.map((report) => (
                  <td key={report.id} className="p-3">
                    <div className="font-mono text-[10px] font-medium text-zinc-900">
                      {new Date().getFullYear() - parseInt(report.year)} years
                    </div>
                  </td>
                ))}
              </tr>

              {/* Risk Assessment */}
              <tr>
                <td className="p-3 bg-zinc-50/50">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-zinc-500" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-700">Risk Level</span>
                  </div>
                </td>
                {reports.map((report) => (
                  <td key={report.id} className="p-3">
                    {report.score >= 85 ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-mono text-[8px] uppercase font-bold">
                        <Check className="w-2 h-2" /> Low Risk
                      </span>
                    ) : report.score >= 70 ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-mono text-[8px] uppercase font-bold">
                        <AlertTriangle className="w-2 h-2" /> Moderate
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-mono text-[8px] uppercase font-bold">
                        <X className="w-2 h-2" /> High Risk
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Report Type */}
              <tr>
                <td className="p-3 bg-zinc-50/50">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-zinc-500" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-700">Data Depth</span>
                  </div>
                </td>
                {reports.map((report) => (
                  <td key={report.id} className="p-3">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded border font-mono text-[8px] uppercase tracking-wider ${
                      report.type === "Detailed" 
                        ? "bg-violet-50 border-violet-200 text-violet-700" 
                        : "bg-zinc-50 border-zinc-200 text-zinc-600"
                    }`}>
                      {report.type} Report
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
