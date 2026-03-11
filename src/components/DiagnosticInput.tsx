import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileText, Crown, ArrowLeft, Camera, History, Activity, User, LogOut, ArrowRight, Check, ShieldCheck, Lock } from "lucide-react";
import UserMenu from "./UserMenu";
import StripeMock from "./StripeMock";
import { toast } from "sonner";

interface DiagnosticInputProps {
  onBack: () => void;
  onLogout: () => void;
  onGenerateReport: (data: any) => void;
  plan: "free" | "pro";
  reports: any[];
  setReports: (reports: any[]) => void;
  userName: string;
  userEmail: string;
  onNavigateToProfile: () => void;
  onNavigateToAccount: () => void;
  onNavigateToPlans: () => void;
  onNavigateToComparison: (reports: any[]) => void;
}



export default function DiagnosticInput({
  onBack,
  onLogout,
  onGenerateReport,
  plan,
  reports,
  setReports,
  userName,
  userEmail,
  onNavigateToProfile,
  onNavigateToAccount,
  onNavigateToPlans,
  onNavigateToComparison,
}: DiagnosticInputProps) {
  const [view, setView] = useState<"dashboard" | "new_scan">("dashboard");
  const [showStripe, setShowStripe] = useState(false);
  const [stripeConfig, setStripeConfig] = useState({ amount: "", item: "" });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedReportIds, setSelectedReportIds] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    odometer: "",
    price: "",
    description: ""
  });

  const handleGenerate = () => {
    if (plan === "free" && reports.length >= 3) {
      alert("You have reached the limit of 3 reports for the Essential plan. Please upgrade to Advance for unlimited reports.");
      return;
    }

    if (plan === "pro") {
      const detailedCount = reports.filter(r => r.type === "Detailed").length;
      if (detailedCount >= 50) {
        alert("You have reached the limit of 50 detailed reports for the Advance plan.");
        return;
      }
    }

    const newReport = {
      id: reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1,
      year: formData.year,
      make: formData.make,
      model: formData.model,
      score: Math.floor(Math.random() * 100) / 10, // Mock score
      date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
      type: plan === "free" ? "Basic" : "Detailed"
    };
    setReports([...reports, newReport]);
    onGenerateReport(newReport);
    toast.success(`${newReport.type} report generated successfully.`);
  };
  const handlePaymentSuccess = () => {
    setShowStripe(false);
    toast.success("Payment successful!");
    // After payment, we simulate generating a report with "Detailed" type even if on free plan
    const newReport = {
      id: reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1,
      year: formData.year || "2024",
      make: formData.make || "Unknown",
      model: formData.model || "Unknown",
      score: Math.floor(Math.random() * 100) / 10,
      date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
      type: "Detailed" // Forced detailed after payment
    };
    setReports([...reports, newReport]);
    onGenerateReport(newReport);
    toast.success("Detailed report generated successfully.");
  };

  const handleGenerateMock = () => {
    const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Tesla", "Chevrolet"];
    const models = ["Camry", "Civic", "F-150", "3 Series", "C-Class", "A4", "Model 3", "Silverado"];
    const years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"];
    
    const randomMake = makes[Math.floor(Math.random() * makes.length)];
    const randomModel = models[Math.floor(Math.random() * models.length)];
    const randomYear = years[Math.floor(Math.random() * years.length)];
    const randomScore = Math.floor(Math.random() * 1000) / 10;

    const newReport = {
      id: reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1,
      year: randomYear,
      make: randomMake,
      model: randomModel,
      score: randomScore,
      date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
      type: plan === "free" ? "Basic" : "Detailed"
    };
    
    setReports([...reports, newReport]);
    toast.info(`Mock report for ${newReport.year} ${newReport.make} added.`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 grid-pattern">
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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-zinc-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center rounded-lg">
              <Activity className="w-5 h-5 text-cyan-600" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-xl">CARWISE<span className="text-violet-600">AI</span></span>
          </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full">
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-zinc-600">
                    {plan === "free" ? "Essential Plan" : "Advance Plan"}
                  </span>
                </div>
                {plan === "pro" && (
                  <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
                    {reports.filter(r => r.type === "Detailed").length} / 50 Detailed Reports
                  </span>
                )}
              </div>
              <UserMenu 
              userName={userName} 
              onLogout={onLogout} 
              onNavigateToProfile={onNavigateToProfile}
              onNavigateToAccount={onNavigateToAccount}
              onNavigateToPlans={onNavigateToPlans}
            />
          </div>
        </div>
      </nav>

      <div className="py-12 px-6">
        {view === "dashboard" ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h1 className="font-display text-4xl mb-2">Your Garage</h1>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Recent Diagnostic Reports</p>
              </div>
              <div className="flex gap-4">
                {plan === "pro" && reports.length > 1 && (
                  <button 
                    onClick={() => {
                      if (isSelecting) {
                        setIsSelecting(false);
                        setSelectedReportIds([]);
                      } else {
                        setIsSelecting(true);
                      }
                    }}
                    className={`flex items-center gap-2 border px-6 py-3 rounded-xl font-mono text-sm tracking-wider uppercase font-bold transition-all ${
                      isSelecting 
                        ? "bg-zinc-900 text-white border-zinc-900" 
                        : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300"
                    }`}
                  >
                    <Activity className={`w-4 h-4 ${isSelecting ? "text-white" : "text-violet-600"}`} />
                    {isSelecting ? "Cancel" : "Compare"}
                  </button>
                )}
                <button 
                  onClick={handleGenerateMock}
                  className="bg-zinc-200 text-zinc-700 px-6 py-3 rounded-xl font-mono text-sm tracking-wider uppercase font-bold hover:bg-zinc-300 transition-all"
                >
                  + Mock Report
                </button>
                <button 
                  onClick={() => setView("new_scan")}
                  className="bg-violet-600 text-white px-6 py-3 rounded-xl font-mono text-sm tracking-wider uppercase font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20"
                >
                  + New Scan
                </button>
              </div>
            </div>

            {isSelecting && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-24 z-40 mb-8 flex justify-between items-center bg-violet-50/90 backdrop-blur-md border border-violet-100 p-4 rounded-2xl shadow-lg shadow-violet-100/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-violet-600" />
                  </div>
                  <span className="font-mono text-xs font-bold text-violet-900 uppercase tracking-wider">
                    Select reports to compare ({selectedReportIds.length})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setIsSelecting(false);
                      setSelectedReportIds([]);
                    }}
                    className="px-6 py-2 rounded-xl font-mono text-sm tracking-wider uppercase font-bold text-violet-700 hover:bg-violet-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      const selectedReports = reports.filter(r => selectedReportIds.includes(r.id));
                      onNavigateToComparison(selectedReports);
                    }}
                    disabled={selectedReportIds.length < 2}
                    className={`px-6 py-2 rounded-xl font-mono text-sm tracking-wider uppercase font-bold transition-all ${
                      selectedReportIds.length >= 2
                        ? "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20"
                        : "bg-violet-200 text-violet-400 cursor-not-allowed"
                    }`}
                  >
                    Compare Selected
                  </button>
                </div>
              </motion.div>
            )}

            {reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-[#FCFCFC] rounded-3xl border border-zinc-200 shadow-sm">
                <History className="w-12 h-12 text-zinc-300 mb-4" />
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-6">No reports yet. Start your first analysis!</p>
                <button 
                  onClick={() => setView("new_scan")}
                  className="bg-violet-600 text-white px-6 py-3 rounded-xl font-mono text-xs tracking-widest uppercase font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20"
                >
                  + Start Analysis
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {reports.map(report => (
                  <div 
                    key={report.id} 
                    onClick={() => {
                      if (isSelecting) {
                        if (selectedReportIds.includes(report.id)) {
                          setSelectedReportIds(selectedReportIds.filter(id => id !== report.id));
                        } else {
                          setSelectedReportIds([...selectedReportIds, report.id]);
                        }
                      } else {
                        onGenerateReport(report);
                      }
                    }}
                    className={`bg-[#FCFCFC] rounded-3xl p-6 border shadow-sm hover:shadow-md transition-all cursor-pointer group relative ${
                      isSelecting && selectedReportIds.includes(report.id)
                        ? "border-violet-600 ring-2 ring-violet-600/20"
                        : "border-zinc-200"
                    }`}
                  >
                    {isSelecting && (
                      <div className={`absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedReportIds.includes(report.id)
                          ? "bg-violet-600 border-violet-600"
                          : "border-zinc-300 bg-white"
                      }`}>
                        {selectedReportIds.includes(report.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-12">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 font-mono text-[10px] tracking-widest uppercase">
                        {report.type}
                      </div>
                      <div className="text-right">
                        <span className="block font-display text-3xl italic text-zinc-900 group-hover:text-violet-600 transition-colors">{report.score}</span>
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Score</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl mb-1 uppercase">{report.year} {report.make}</h3>
                      <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">{report.model}</p>
                      <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">{report.date}</span>
                        <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-violet-600 transition-colors group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <button 
              onClick={() => setView("dashboard")}
              className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-950 transition-colors font-mono text-[10px] tracking-widest uppercase"
            >
              <ArrowLeft className="w-3 h-3" />
              Return to Dashboard
            </button>

            {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl tracking-tight mb-4">Start New Scan</h1>
          <p className="text-zinc-500 font-mono text-xs tracking-wider uppercase">
            Enter vehicle details for a risk assessment.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#FCFCFC] rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 border border-zinc-200 p-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Model Year */}
            <div className="space-y-2">
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                Model Year
              </label>
              <input 
                type="text" 
                placeholder="2021"
                value={formData.year || ""}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 font-mono text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
              />
            </div>

            {/* Manufacturer */}
            <div className="space-y-2">
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                Make
              </label>
              <input 
                type="text" 
                placeholder="e.g. TOYOTA"
                value={formData.make || ""}
                onChange={(e) => setFormData({...formData, make: e.target.value})}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 font-mono text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
              />
            </div>
          </div>

          {/* Model Designation */}
          <div className="space-y-2 mb-8">
            <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
              Model
            </label>
            <input 
              type="text" 
              placeholder="e.g. CAMRY SE V6"
              value={formData.model || ""}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 font-mono text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Odometer */}
            <div className="space-y-2">
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                Odometer (MI)
              </label>
              <input 
                type="text" 
                placeholder="60000"
                value={formData.odometer || ""}
                onChange={(e) => setFormData({...formData, odometer: e.target.value})}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 font-mono text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
              />
            </div>

            {/* Listing Price */}
            <div className="space-y-2">
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
                Listing Price (USD)
              </label>
              <input 
                type="text" 
                placeholder="15000"
                value={formData.price || ""}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 font-mono text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
              />
            </div>
          </div>

          {/* Description / Red Flags */}
          <div className="space-y-4 mb-12">
            <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-bold">
              Observation & Red Flags
            </label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="List any red flags:&#10;• Mechanical: Smoke, rust, or shifting issues?&#10;• History: Are service receipts available?&#10;• Usage: Was it used for delivery or heavy commuting?&#10;• Behavior: Did the seller refuse a mechanic's inspection?"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-3xl px-6 py-6 font-mono text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all min-h-[160px] resize-none leading-relaxed"
            />
          </div>

          {/* Upload Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-zinc-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all relative group hover:border-violet-200 hover:bg-violet-50/30 cursor-pointer">
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[7px] uppercase tracking-widest text-zinc-400 font-bold px-2 py-0.5 rounded-full bg-zinc-100">Detailed Feature</span>
              </div>
              <div className="flex items-center gap-2 transition-colors text-zinc-400 group-hover:text-violet-600">
                <Camera className="w-4 h-4" />
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold">Image Upload</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6 transition-colors text-zinc-300 group-hover:text-violet-400" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">Upload Images</span>
              </div>
            </div>

            {/* CarFax Report */}
            <div className="border-2 border-dashed border-zinc-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all relative group hover:border-violet-200 hover:bg-violet-50/30 cursor-pointer">
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[7px] uppercase tracking-widest text-zinc-400 font-bold px-2 py-0.5 rounded-full bg-zinc-100">Detailed Feature</span>
              </div>
              <div className="flex items-center gap-2 transition-colors text-zinc-400 group-hover:text-violet-600">
                <History className="w-4 h-4" />
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold">CarFax Report</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FileText className="w-6 h-6 transition-colors text-zinc-300 group-hover:text-violet-400" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">Upload PDF</span>
              </div>
            </div>

            {/* Pre-inspection */}
            <div className="border-2 border-dashed border-zinc-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 transition-all relative group hover:border-violet-200 hover:bg-violet-50/30 cursor-pointer">
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[7px] uppercase tracking-widest text-zinc-400 font-bold px-2 py-0.5 rounded-full bg-zinc-100">Detailed Feature</span>
              </div>
              <div className="flex items-center gap-2 transition-colors text-zinc-400 group-hover:text-violet-600">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold">Pre-inspection</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FileText className="w-6 h-6 transition-colors text-zinc-300 group-hover:text-violet-400" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">Upload Report</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {plan === "free" ? (
            <div className="space-y-4">
              <button 
                onClick={handleGenerate}
                disabled={reports.length >= 3}
                className={`w-full py-6 rounded-2xl font-mono text-sm tracking-wider uppercase font-bold flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98] ${
                  reports.length >= 3 
                    ? "bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none" 
                    : "bg-violet-600 text-white hover:bg-violet-700 shadow-violet-600/20"
                }`}
              >
                <FileText className="w-4 h-4" />
                {reports.length >= 3 ? "Report Limit Reached" : `Generate Basic Report (${3 - reports.length} Left)`}
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    setStripeConfig({ amount: "$9", item: "Detailed Diagnostic Report" });
                    setShowStripe(true);
                  }}
                  className="w-full bg-emerald-50 text-emerald-700 py-4 rounded-2xl font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all border border-emerald-200"
                >
                  <Crown className="w-4 h-4" />
                  Detailed Report ($9)
                </button>
                <button 
                  onClick={() => {
                    setStripeConfig({ amount: "$49", item: "Advance Monthly Subscription" });
                    setShowStripe(true);
                  }}
                  className="w-full bg-amber-50 text-amber-700 py-4 rounded-2xl font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 hover:bg-amber-100 transition-all border border-amber-200"
                >
                  <Crown className="w-4 h-4 fill-amber-500" />
                  Upgrade ($49)
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleGenerate}
              className="w-full bg-violet-600 text-white py-6 rounded-2xl font-mono text-xs tracking-[0.3em] uppercase font-bold flex items-center justify-center gap-3 hover:bg-violet-700 transition-all shadow-xl shadow-violet-600/20 active:scale-[0.98]"
            >
              <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              Generate Detailed Report
            </button>
          )}
        </div>
      </motion.div>
        )}
      </div>
    </div>
  );
}
