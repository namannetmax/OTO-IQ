import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import DiagnosticInput from "./components/DiagnosticInput";
import RegisterPage from "./components/RegisterPage";
import MockReport from "./components/MockReport";
import ProfileSettings from "./components/ProfileSettings";
import AccountSettings from "./components/AccountSettings";
import PlanSettings from "./components/PlanSettings";
import ReportComparison from "./components/ReportComparison";
import StaffDashboard from "./components/StaffDashboard";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Activity } from "lucide-react";
import { Toaster } from "sonner";

type AppStep = "landing" | "register" | "login" | "staff_login" | "welcome" | "input" | "report" | "profile_settings" | "account_settings" | "plan_settings" | "report_comparison" | "staff_dashboard";

export default function App() {
  const [step, setStep] = useState<AppStep>("landing");
  const [userPlan, setUserPlan] = useState<"free" | "pro">(() => {
    const savedPlan = localStorage.getItem("userPlan");
    return savedPlan === "pro" ? "pro" : "free";
  });
  const [downgradePending, setDowngradePending] = useState<boolean>(() => {
    return localStorage.getItem("downgradePending") === "true";
  });
  const [planExpiryDate, setPlanExpiryDate] = useState<string | null>(() => {
    return localStorage.getItem("planExpiryDate");
  });
  const [userName, setUserName] = useState<string>(() => localStorage.getItem("userName") || "John Doe");
  const [userEmail, setUserEmail] = useState<string>(() => localStorage.getItem("userEmail") || "john.doe@example.com");
  const [reports, setReports] = useState<any[]>(() => {
    const savedReports = localStorage.getItem("diagnosticReports");
    return savedReports ? JSON.parse(savedReports) : [];
  });

  useEffect(() => {
    localStorage.setItem("userPlan", userPlan);
  }, [userPlan]);

  useEffect(() => {
    localStorage.setItem("downgradePending", String(downgradePending));
  }, [downgradePending]);

  useEffect(() => {
    if (planExpiryDate) {
      localStorage.setItem("planExpiryDate", planExpiryDate);
    } else {
      localStorage.removeItem("planExpiryDate");
    }
  }, [planExpiryDate]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("userEmail", userEmail);
  }, [userEmail]);

  useEffect(() => {
    localStorage.setItem("diagnosticReports", JSON.stringify(reports));
  }, [reports]);

  const [reportData, setReportData] = useState<any>(null);

  const handleRegister = (data: any) => {
    console.log("Registered with:", data);
    
    if (data.isStaff) {
      setStep("staff_dashboard");
      return;
    }

    // Clear any existing data for a fresh start
    setReports([]);
    localStorage.removeItem("diagnosticReports");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPlan");
    localStorage.removeItem("downgradePending");
    localStorage.removeItem("planExpiryDate");
    
    setUserName(data.fullName || "John Doe");
    setUserEmail(data.email || "john.doe@example.com");
    setUserPlan("free");
    setDowngradePending(false);
    setPlanExpiryDate(null);
    setStep("welcome");
    // Auto transition to input after welcome message
    setTimeout(() => {
      setStep("input");
    }, 2500);
  };

  const handleLogout = () => {
    setReports([]);
    localStorage.removeItem("diagnosticReports");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPlan");
    localStorage.removeItem("downgradePending");
    localStorage.removeItem("planExpiryDate");
    setUserName("John Doe");
    setUserEmail("john.doe@example.com");
    setUserPlan("free");
    setDowngradePending(false);
    setPlanExpiryDate(null);
    setStep("landing");
  };

  const handleGenerateReport = (data: any) => {
    setReportData(data);
    setStep("report");
  };

  const handleUpgradeReport = (reportId: number) => {
    const detailedCount = reports.filter(r => r.type === "Detailed").length;
    if (detailedCount >= 50) {
      alert("You have reached the limit of 50 detailed reports for the Advance plan.");
      return;
    }

    const updatedReports = reports.map(r => 
      r.id === reportId ? { ...r, type: "Detailed" } : r
    );
    setReports(updatedReports);
    // Update the currently viewed report data as well
    const updatedReport = updatedReports.find(r => r.id === reportId);
    if (updatedReport) {
      setReportData(updatedReport);
    }
  };

  const [selectedReports, setSelectedReports] = useState<any[]>([]);

  return (
    <>
      <Toaster 
        position="top-center" 
        expand={false} 
        toastOptions={{
          className: "font-mono text-[10px] uppercase tracking-[0.2em] font-bold border-zinc-200 rounded-2xl shadow-2xl bg-white text-zinc-900",
          style: {
            padding: '16px 24px',
          },
          classNames: {
            success: "border-emerald-100 bg-emerald-50 text-emerald-700",
            error: "border-rose-100 bg-rose-50 text-rose-700",
            info: "border-violet-100 bg-violet-50 text-violet-700",
          }
        }}
      />
      <AnimatePresence mode="wait">
      {step === "landing" && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LandingPage 
            onNavigateToRegister={() => setStep("register")} 
            onNavigateToLogin={() => setStep("login")}
            onNavigateToStaffLogin={() => setStep("staff_login")}
          />
        </motion.div>
      )}

      {(step === "register" || step === "login" || step === "staff_login") && (
        <motion.div
          key="auth"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <RegisterPage 
            initialMode={step}
            onAuth={handleRegister} 
            onBack={() => setStep("landing")} 
          />
        </motion.div>
      )}

      {step === "welcome" && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-6"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-600/40"
            >
              <Activity className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-5xl mb-4 italic"
            >
              Welcome to CarWise AI
            </motion.h2>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-500"
            >
              Initializing Diagnostic Environment...
            </motion.p>
          </div>
        </motion.div>
      )}

      {(step === "input" || step === "report" || step === "profile_settings" || step === "account_settings" || step === "plan_settings" || step === "report_comparison") && (
        <motion.div
          key="dashboard_content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <DiagnosticInput 
                  plan={userPlan}
                  reports={reports}
                  setReports={setReports}
                  onBack={() => setStep("landing")} 
                  onGenerateReport={handleGenerateReport}
                  onLogout={handleLogout}
                  userName={userName}
                  userEmail={userEmail}
                  onNavigateToProfile={() => setStep("profile_settings")}
                  onNavigateToAccount={() => setStep("account_settings")}
                  onNavigateToPlans={() => setStep("plan_settings")}
                  onNavigateToComparison={(reportsToCompare) => {
                    setSelectedReports(reportsToCompare);
                    setStep("report_comparison");
                  }}
                />
              </motion.div>
            )}

            {step === "report" && (
              <motion.div
                key="report"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <MockReport 
                  vehicleData={reportData} 
                  plan={userPlan}
                  reports={reports}
                  onBack={() => setStep("input")} 
                  onUpgradeReport={handleUpgradeReport}
                />
              </motion.div>
            )}

            {step === "profile_settings" && (
              <motion.div
                key="profile_settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ProfileSettings
                  onBack={() => setStep("input")}
                  currentUserName={userName}
                />
              </motion.div>
            )}

            {step === "account_settings" && (
              <motion.div
                key="account_settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <AccountSettings
                  onBack={() => setStep("input")}
                  currentUserEmail={userEmail}
                  userPlan={userPlan}
                />
              </motion.div>
            )}
            {step === "plan_settings" && (
              <motion.div
                key="plan_settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <PlanSettings
                  onBack={() => setStep("input")}
                  currentPlan={userPlan}
                  downgradePending={downgradePending}
                  planExpiryDate={planExpiryDate}
                  onUpdatePlan={(plan, isDowngrade = false) => {
                    if (isDowngrade) {
                      setDowngradePending(true);
                      const expiry = new Date();
                      expiry.setDate(expiry.getDate() + 30);
                      setPlanExpiryDate(expiry.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }));
                    } else {
                      setUserPlan(plan);
                      setDowngradePending(false);
                      setPlanExpiryDate(null);
                    }
                    setStep("input");
                  }}
                />
              </motion.div>
            )}

            {step === "report_comparison" && (
              <motion.div
                key="report_comparison"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ReportComparison
                  reports={selectedReports}
                  onBack={() => setStep("input")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {step === "staff_dashboard" && (
        <motion.div
          key="staff_dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <StaffDashboard onLogout={handleLogout} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
