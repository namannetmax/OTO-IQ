import { useState, useEffect } from "react";
import { 
  Users, 
  CreditCard, 
  BarChart3, 
  ShieldCheck, 
  LogOut, 
  Search, 
  MoreHorizontal, 
  Filter,
  Download,
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowLeft,
  Mail,
  Calendar,
  DollarSign,
  Activity,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

interface StaffDashboardProps {
  onLogout: () => void;
}

type View = "overview" | "customers" | "payments" | "usage" | "customer_detail" | "usage_detail" | "feedback";

// --- Mock Data ---

const MOCK_GENERATED_REPORTS = [
  { id: "r_1", customer: "David Wilson", date: "Mar 05, 2026 14:30", type: "Detailed", vehicle: "2021 Toyota Camry", status: "Completed", tokens: 15420, cost: "$0.0023" },
  { id: "r_2", customer: "David Wilson", date: "Mar 04, 2026 09:15", type: "Basic", vehicle: "2018 Honda Accord", status: "Completed", tokens: 4200, cost: "$0.0006" },
  { id: "r_3", customer: "David Wilson", date: "Mar 03, 2026 16:45", type: "Detailed", vehicle: "2020 Ford F-150", status: "Completed", tokens: 16800, cost: "$0.0025" },
  { id: "r_4", customer: "David Wilson", date: "Mar 01, 2026 10:00", type: "Basic", vehicle: "2019 Chevrolet Malibu", status: "Completed", tokens: 3800, cost: "$0.0005" },
  { id: "r_5", customer: "Michael Brown", date: "Mar 05, 2026 11:20", type: "Detailed", vehicle: "2023 Tesla Model Y", status: "Completed", tokens: 18200, cost: "$0.0027" },
  { id: "r_6", customer: "Michael Brown", date: "Mar 02, 2026 13:10", type: "Basic", vehicle: "2022 BMW X5", status: "Completed", tokens: 5100, cost: "$0.0008" },
  { id: "r_7", customer: "Sarah Smith", date: "Mar 04, 2026 15:30", type: "Detailed", vehicle: "2021 Audi Q5", status: "Completed", tokens: 14900, cost: "$0.0022" },
  { id: "r_8", customer: "John Doe", date: "Feb 28, 2026 09:45", type: "Basic", vehicle: "2015 Nissan Altima", status: "Completed", tokens: 3500, cost: "$0.0005" },
  { id: "r_9", customer: "Jennifer White", date: "Mar 05, 2026 08:30", type: "Detailed", vehicle: "2024 Mercedes C-Class", status: "Processing", tokens: 0, cost: "$0.00" },
  { id: "r_10", customer: "Thomas Anderson", date: "Mar 03, 2026 12:00", type: "Detailed", vehicle: "2022 Rivian R1T", status: "Completed", tokens: 19500, cost: "$0.0029" },
];

const MOCK_FEEDBACK = [
  { id: "fb_1", reportId: "r_1", customer: "David Wilson", type: "positive", comment: "Very detailed report, helped me negotiate the price down.", date: "Mar 05, 2026 15:00" },
  { id: "fb_2", reportId: "r_3", customer: "David Wilson", type: "positive", comment: "Good info but missed some minor scratches.", date: "Mar 03, 2026 18:20" },
  { id: "fb_3", reportId: "r_5", customer: "Michael Brown", type: "positive", comment: "Excellent service! The AI insights were spot on.", date: "Mar 05, 2026 12:45" },
  { id: "fb_4", reportId: "r_7", customer: "Sarah Smith", type: "negative", comment: "Expected more details on the engine condition.", date: "Mar 04, 2026 16:10" },
  { id: "fb_5", reportId: "r_8", customer: "John Doe", type: "positive", comment: "Fast and easy to use.", date: "Feb 28, 2026 10:30" },
];

const MOCK_CUSTOMERS = [
  { id: "cus_1", name: "John Doe", email: "john.doe@example.com", status: "Active", plan: "Basic", created: "Oct 12, 2023", ltv: "$0.00", phone: "+1 (555) 123-4567", next_invoice: "N/A" },
  { id: "cus_2", name: "Sarah Smith", email: "sarah.smith@example.com", status: "Active", plan: "Advance", created: "Nov 05, 2023", ltv: "$147.00", phone: "+1 (555) 987-6543", next_invoice: "Apr 05, 2026" },
  { id: "cus_3", name: "Michael Brown", email: "m.brown@corporate.com", status: "Active", plan: "Advance", created: "Sep 20, 2023", ltv: "$294.00", phone: "+1 (555) 456-7890", next_invoice: "Apr 20, 2026" },
  { id: "cus_4", name: "Emily Davis", email: "emily.d@example.com", status: "Past Due", plan: "Basic", created: "Dec 01, 2023", ltv: "$0.00", phone: "+1 (555) 222-3333", next_invoice: "N/A" },
  { id: "cus_5", name: "David Wilson", email: "dwilson@auto-shop.net", status: "Active", plan: "Advance", created: "Aug 15, 2023", ltv: "$490.00", phone: "+1 (555) 777-8888", next_invoice: "Aug 15, 2026" },
  { id: "cus_6", name: "Jessica Lee", email: "jess.lee@example.com", status: "Canceled", plan: "Advance", created: "Jan 10, 2024", ltv: "$49.00", phone: "+1 (555) 999-0000", next_invoice: "N/A" },
  { id: "cus_7", name: "Robert Taylor", email: "robert.t@example.com", status: "Active", plan: "Basic", created: "Feb 14, 2024", ltv: "$0.00", phone: "+1 (555) 111-2222", next_invoice: "N/A" },
  { id: "cus_8", name: "Jennifer White", email: "jen.white@example.com", status: "Active", plan: "Advance", created: "Mar 01, 2024", ltv: "$98.00", phone: "+1 (555) 333-4444", next_invoice: "Apr 01, 2026" },
  { id: "cus_9", name: "William Harris", email: "will.harris@example.com", status: "Failed", plan: "Advance", created: "Jan 20, 2024", ltv: "$49.00", phone: "+1 (555) 555-6666", next_invoice: "N/A" },
  { id: "cus_10", name: "Linda Martin", email: "linda.m@example.com", status: "Active", plan: "Basic", created: "Dec 15, 2023", ltv: "$0.00", phone: "+1 (555) 777-9999", next_invoice: "N/A" },
  { id: "cus_11", name: "Thomas Anderson", email: "t.anderson@matrix.com", status: "Active", plan: "Advance", created: "Nov 22, 2023", ltv: "$196.00", phone: "+1 (555) 000-1111", next_invoice: "Mar 22, 2026" },
  { id: "cus_12", name: "Barbara Jackson", email: "barb.j@example.com", status: "Active", plan: "Basic", created: "Oct 30, 2023", ltv: "$0.00", phone: "+1 (555) 222-4444", next_invoice: "N/A" },
];

const MOCK_PAYMENTS = [
  { id: "py_1", amount: "$49.00", status: "Succeeded", description: "Advance Plan (Monthly)", customer: "sarah.smith@example.com", date: "Mar 02, 2026", method: "Visa •••• 4242" },
  { id: "py_2", amount: "$9.00", status: "Succeeded", description: "Detailed Report (One-time)", customer: "john.doe@example.com", date: "Mar 01, 2026", method: "Mastercard •••• 8888" },
  { id: "py_3", amount: "$49.00", status: "Failed", description: "Advance Plan (Monthly)", customer: "emily.d@example.com", date: "Feb 28, 2026", method: "Visa •••• 1234" },
  { id: "py_4", amount: "$49.00", status: "Succeeded", description: "Advance Plan (Monthly)", customer: "m.brown@corporate.com", date: "Feb 28, 2026", method: "Amex •••• 0005" },
  { id: "py_5", amount: "$49.00", status: "Refunded", description: "Advance Plan (Monthly)", customer: "jess.lee@example.com", date: "Feb 15, 2026", method: "Visa •••• 4242" },
  { id: "py_6", amount: "$490.00", status: "Succeeded", description: "Advance Plan (Yearly)", customer: "dwilson@auto-shop.net", date: "Jan 01, 2026", method: "Visa •••• 9999" },
  { id: "py_7", amount: "$49.00", status: "Succeeded", description: "Advance Plan (Monthly)", customer: "jen.white@example.com", date: "Mar 01, 2026", method: "Visa •••• 1111" },
  { id: "py_8", amount: "$49.00", status: "Succeeded", description: "Advance Plan (Monthly)", customer: "t.anderson@matrix.com", date: "Feb 22, 2026", method: "Mastercard •••• 2222" },
  { id: "py_9", amount: "$49.00", status: "Failed", description: "Advance Plan (Monthly)", customer: "will.harris@example.com", date: "Feb 20, 2026", method: "Visa •••• 3333" },
  { id: "py_10", amount: "$9.00", status: "Succeeded", description: "Detailed Report (One-time)", customer: "robert.t@example.com", date: "Feb 14, 2026", method: "Amex •••• 4444" },
  { id: "py_11", amount: "$49.00", status: "Succeeded", description: "Advance Plan (Monthly)", customer: "sarah.smith@example.com", date: "Feb 02, 2026", method: "Visa •••• 4242" },
  { id: "py_12", amount: "$49.00", status: "Succeeded", description: "Advance Plan (Monthly)", customer: "m.brown@corporate.com", date: "Jan 28, 2026", method: "Amex •••• 0005" },
];

const MOCK_USAGE = [
  { id: "us_1", customer: "David Wilson", total: 342, detailed: 310, last_active: "2 mins ago", trend: "+12%" },
  { id: "us_2", customer: "Michael Brown", total: 128, detailed: 86, last_active: "1 hour ago", trend: "+5%" },
  { id: "us_3", customer: "Sarah Smith", total: 45, detailed: 12, last_active: "3 hours ago", trend: "+8%" },
  { id: "us_4", customer: "John Doe", total: 3, detailed: 1, last_active: "2 days ago", trend: "0%" },
  { id: "us_5", customer: "Emily Davis", total: 1, detailed: 0, last_active: "1 week ago", trend: "-20%" },
  { id: "us_6", customer: "Jennifer White", total: 22, detailed: 15, last_active: "5 hours ago", trend: "+15%" },
  { id: "us_7", customer: "Thomas Anderson", total: 56, detailed: 40, last_active: "1 day ago", trend: "+2%" },
  { id: "us_8", customer: "Robert Taylor", total: 5, detailed: 0, last_active: "3 days ago", trend: "0%" },
  { id: "us_9", customer: "William Harris", total: 12, detailed: 8, last_active: "2 weeks ago", trend: "-5%" },
  { id: "us_10", customer: "Linda Martin", total: 2, detailed: 0, last_active: "1 month ago", trend: "0%" },
  { id: "us_11", customer: "Barbara Jackson", total: 1, detailed: 0, last_active: "2 months ago", trend: "0%" },
  { id: "us_12", customer: "Jessica Lee", total: 18, detailed: 10, last_active: "3 months ago", trend: "-100%" },
];

const MOCK_LOGS = [
  { id: "log_1", event: "report.generated", date: "Mar 02, 2026 14:30", details: "Detailed Report generated for 2021 Toyota Camry" },
  { id: "log_2", event: "subscription.renewed", date: "Mar 02, 2026 09:00", details: "Advance Plan renewed successfully" },
  { id: "log_3", event: "login.success", date: "Mar 01, 2026 18:45", details: "Login from IP 192.168.1.1" },
];

export default function StaffDashboard({ onLogout }: StaffDashboardProps) {
  const [currentView, setCurrentView] = useState<View>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [currentView, searchTerm]);

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPayments = MOCK_PAYMENTS.filter(p => p.customer.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredUsage = MOCK_USAGE.filter(u => u.customer.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredFeedback = MOCK_FEEDBACK.filter(f => f.customer.toLowerCase().includes(searchTerm.toLowerCase()) || f.comment.toLowerCase().includes(searchTerm.toLowerCase()));

  const PaginationControls = ({ totalItems }: { totalItems: number }) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 bg-zinc-50/50">
        <span className="text-xs text-zinc-500 font-mono">
          SHOWING {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} OF {totalItems}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md border border-zinc-200 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-md border border-zinc-200 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </button>
        </div>
      </div>
    );
  };

  const [selectedUsageCustomer, setSelectedUsageCustomer] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);

  // Helper to render status badge
  const renderStatus = (status: string) => {
    const styles: Record<string, string> = {
      "Active": "bg-emerald-100 text-emerald-700",
      "Succeeded": "bg-emerald-100 text-emerald-700",
      "Completed": "bg-emerald-100 text-emerald-700",
      "Processing": "bg-amber-100 text-amber-700",
      "Past Due": "bg-amber-100 text-amber-700",
      "Refunded": "bg-zinc-100 text-zinc-600",
      "Canceled": "bg-zinc-100 text-zinc-600",
      "Failed": "bg-rose-100 text-rose-700",
    };
    
    const icons: Record<string, any> = {
      "Active": CheckCircle2,
      "Succeeded": CheckCircle2,
      "Completed": CheckCircle2,
      "Processing": Clock,
      "Past Due": Clock,
      "Refunded": ArrowUpRight,
      "Canceled": XCircle,
      "Failed": XCircle,
    };

    const Icon = icons[status] || CheckCircle2;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold ${styles[status] || "bg-zinc-100 text-zinc-600"}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const handleCustomerClick = (customer: any) => {
    setSelectedCustomer(customer);
    setCurrentView("customer_detail");
  };

  const navigateToCustomer = (identifier: string) => {
    const customer = MOCK_CUSTOMERS.find(c => c.email === identifier || c.name === identifier);
    if (customer) {
      handleCustomerClick(customer);
    }
  };

  const handleUsageClick = (customerName: string) => {
    setSelectedUsageCustomer(customerName);
    setCurrentView("usage_detail");
  };

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
  };

  const calculateLTV = (email: string) => {
    const total = MOCK_PAYMENTS
      .filter(p => p.customer === email && p.status === "Succeeded")
      .reduce((sum, p) => {
        const amount = parseFloat(p.amount.replace('$', '').replace(',', ''));
        return sum + amount;
      }, 0);
    return `$${total.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex font-sans text-zinc-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center rounded-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="font-mono font-bold tracking-tighter text-lg">CARWISE<span className="text-emerald-600">ADMIN</span></span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setCurrentView("overview")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === "overview" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </button>
          <button 
            onClick={() => setCurrentView("customers")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === "customers" || currentView === "customer_detail" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
          >
            <Users className="w-4 h-4" />
            Customers
          </button>
          <button 
            onClick={() => setCurrentView("payments")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === "payments" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
          >
            <CreditCard className="w-4 h-4" />
            Payments
          </button>
          <button 
            onClick={() => setCurrentView("usage")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === "usage" || currentView === "usage_detail" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
          >
            <BarChart3 className="w-4 h-4" />
            Reports Usage
          </button>
          <button 
            onClick={() => setCurrentView("feedback")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === "feedback" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"}`}
          >
            <MessageSquare className="w-4 h-4" />
            Feedback
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        {currentView !== "customer_detail" && currentView !== "usage_detail" && (
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-display text-2xl capitalize">{currentView}</h1>
            </div>
            {currentView !== "overview" && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 w-64 shadow-sm"
                  />
                </div>
              </div>
            )}
          </header>
        )}

        {/* Views */}
        {currentView === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Gross Volume</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-display">$12,450.00</span>
                  <span className="text-emerald-600 text-xs font-medium">+12.5%</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">New Customers</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-display">142</span>
                  <span className="text-emerald-600 text-xs font-medium">+4.2%</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Active Subscriptions</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-display">892</span>
                  <span className="text-emerald-600 text-xs font-medium">+8.1%</span>
                </div>
              </div>
            </div>
            
            {/* Recent Activity Table */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100">
                <h3 className="font-medium text-sm">Recent Payments</h3>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 text-zinc-500 font-medium">
                  <tr>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {MOCK_PAYMENTS.slice(0, 3).map((payment) => (
                    <tr key={payment.id} className="hover:bg-zinc-50/50">
                      <td className="px-6 py-4 font-medium">{payment.amount}</td>
                      <td className="px-6 py-4">{renderStatus(payment.status)}</td>
                      <td className="px-6 py-4 text-zinc-600">
                        <button 
                          onClick={() => navigateToCustomer(payment.customer)}
                          className="hover:text-violet-600 hover:underline text-left font-medium transition-colors"
                        >
                          {payment.customer}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentView === "customers" && (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 text-zinc-500 font-medium">
                <tr>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">LTV</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredCustomers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((customer) => (
                  <tr 
                    key={customer.id} 
                    onClick={() => handleCustomerClick(customer)}
                    className="hover:bg-zinc-50/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">{customer.name}</div>
                      <div className="text-xs text-zinc-500">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4">{renderStatus(customer.status)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-zinc-100 text-zinc-700 text-xs font-medium">
                        {customer.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-zinc-600">{calculateLTV(customer.email)}</td>
                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{customer.created}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-400 hover:text-zinc-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationControls totalItems={filteredCustomers.length} />
          </div>
        )}

        {currentView === "customer_detail" && selectedCustomer && (
          <div className="space-y-6">
            {/* Back Button */}
            <button 
              onClick={() => setCurrentView("customers")}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-mono text-xs uppercase tracking-widest font-bold mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Customers
            </button>

            {/* Header Card */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm flex justify-between items-start">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-2xl font-display text-zinc-400">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h1 className="font-display text-3xl mb-1">{selectedCustomer.name}</h1>
                  <div className="flex items-center gap-4 text-zinc-500 text-sm mb-4">
                    <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {selectedCustomer.email}</span>
                    <span className="font-mono text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">{selectedCustomer.id}</span>
                  </div>
                  <div className="flex gap-2">
                    {renderStatus(selectedCustomer.status)}
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-violet-50 text-violet-700 text-[10px] font-mono uppercase tracking-wider font-bold">
                      {selectedCustomer.plan} Plan
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors text-rose-600 hover:text-rose-700 hover:border-rose-200">
                  Cancel Subscription
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Left Column: Details */}
              <div className="col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                  <h3 className="font-medium text-sm mb-4 uppercase tracking-wider text-zinc-500 font-mono">Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-zinc-500 block mb-1">Account Created</label>
                      <div className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        {selectedCustomer.created}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 block mb-1">Phone Number</label>
                      <div className="text-sm font-medium">{selectedCustomer.phone}</div>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 block mb-1">Billing ID</label>
                      <div className="text-sm font-mono text-zinc-600">cus_8s9d8f9s8d</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                  <h3 className="font-medium text-sm mb-4 uppercase tracking-wider text-zinc-500 font-mono">Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-600">Lifetime Value</span>
                      <span className="font-mono font-medium">{calculateLTV(selectedCustomer.email)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-600">Total Reports</span>
                      <span className="font-mono font-medium">
                        {MOCK_USAGE.find(u => u.customer === selectedCustomer.name)?.total || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-600">Next Invoice</span>
                      <span className="font-mono text-xs text-zinc-500">{selectedCustomer.next_invoice}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                      <span className="text-sm text-zinc-600">Avg Token/Month</span>
                      <div className="text-right">
                        <div className="font-mono font-medium text-violet-600">
                          {Math.floor(Math.random() * 50000 + 10000).toLocaleString()}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          ≈${(Math.random() * 5 + 1).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Activity & Payments */}
              <div className="col-span-2 space-y-6">
                {/* Recent Payments */}
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                    <h3 className="font-medium text-sm">Payment History</h3>
                    <button 
                      onClick={() => {
                        setSearchTerm(selectedCustomer.email);
                        setCurrentView("payments");
                      }}
                      className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 text-zinc-500 font-medium">
                      <tr>
                        <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {MOCK_PAYMENTS.filter(p => p.customer === selectedCustomer.email).map((payment) => (
                        <tr key={payment.id} className="hover:bg-zinc-50/50">
                          <td className="px-6 py-4 font-medium">{payment.amount}</td>
                          <td className="px-6 py-4">{renderStatus(payment.status)}</td>
                          <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{payment.date}</td>
                          <td className="px-6 py-4 text-zinc-500 text-xs flex items-center gap-1">
                            <CreditCard className="w-3 h-3" /> {payment.method}
                          </td>
                        </tr>
                      ))}
                      {MOCK_PAYMENTS.filter(p => p.customer === selectedCustomer.email).length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 text-sm">No payments found for this customer.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Activity Logs */}
                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-zinc-100">
                    <h3 className="font-medium text-sm">Activity Log</h3>
                  </div>
                  <div className="divide-y divide-zinc-100">
                    {MOCK_LOGS.map((log) => (
                      <div key={log.id} className="px-6 py-4 flex items-start gap-4">
                        <div className="mt-1">
                          <Activity className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-900">{log.event}</p>
                          <p className="text-sm text-zinc-500">{log.details}</p>
                          <p className="text-xs text-zinc-400 font-mono mt-1">{log.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === "payments" && (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 text-zinc-500 font-medium">
                <tr>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredPayments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((payment) => (
                  <tr key={payment.id} className="hover:bg-zinc-50/50">
                    <td className="px-6 py-4 font-medium text-zinc-900">
                      {payment.amount} 
                      <span className="text-zinc-400 font-normal ml-1">USD</span>
                    </td>
                    <td className="px-6 py-4">{renderStatus(payment.status)}</td>
                    <td className="px-6 py-4 text-zinc-600">
                      {payment.description}
                      <div className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                        <CreditCard className="w-3 h-3" />
                        {payment.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-600">
                      <button 
                        onClick={() => navigateToCustomer(payment.customer)}
                        className="hover:text-violet-600 hover:underline text-left font-medium transition-colors"
                      >
                        {payment.customer}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{payment.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-400 hover:text-zinc-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationControls totalItems={filteredPayments.length} />
          </div>
        )}

        {currentView === "usage" && (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 text-zinc-500 font-medium">
                <tr>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Total Reports</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Detailed Reports</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Trend</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredUsage.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((usage) => (
                  <tr key={usage.id} className="hover:bg-zinc-50/50">
                    <td className="px-6 py-4 font-medium text-zinc-900">
                      <button 
                        onClick={() => navigateToCustomer(usage.customer)}
                        className="hover:text-violet-600 hover:underline text-left font-medium transition-colors"
                      >
                        {usage.customer}
                      </button>
                    </td>
                    <td className="px-6 py-4 font-mono text-zinc-600">{usage.total}</td>
                    <td className="px-6 py-4 font-mono text-zinc-600">{usage.detailed}</td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">{usage.last_active}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center text-xs font-medium ${usage.trend.startsWith('+') ? 'text-emerald-600' : usage.trend === '0%' ? 'text-zinc-500' : 'text-rose-600'}`}>
                        {usage.trend}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleUsageClick(usage.customer)}
                        className="text-xs font-medium text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-md transition-colors"
                      >
                        View Logs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationControls totalItems={filteredUsage.length} />
          </div>
        )}

        {currentView === "feedback" && (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 text-zinc-500 font-medium">
                <tr>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Feedback</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Comment</th>
                  <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredFeedback.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-zinc-50/50">
                    <td className="px-6 py-4 font-medium text-zinc-900">
                      <button 
                        onClick={() => navigateToCustomer(feedback.customer)}
                        className="group flex items-center gap-1.5 hover:text-violet-600 transition-colors"
                      >
                        <span className="group-hover:underline">{feedback.customer}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {feedback.type === 'positive' ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-medium">
                          <ThumbsUp className="w-3 h-3" />
                          Helpful
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-100 text-rose-700 text-xs font-medium">
                          <ThumbsDown className="w-3 h-3" />
                          Not Helpful
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedFeedback(feedback)}
                        className="text-left text-zinc-600 max-w-xs truncate hover:text-violet-600 hover:bg-violet-50 px-2 py-1 -ml-2 rounded transition-colors w-full block"
                        title="Click to view full comment"
                      >
                        {feedback.comment}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{feedback.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedFeedback(feedback)}
                        className="text-zinc-400 hover:text-violet-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredFeedback.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">No feedback found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <PaginationControls totalItems={filteredFeedback.length} />
          </div>
        )}

        {currentView === "usage_detail" && selectedUsageCustomer && (
          <div className="space-y-6">
            {/* Back Button */}
            <button 
              onClick={() => setCurrentView("usage")}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-mono text-xs uppercase tracking-widest font-bold mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Usage
            </button>

            <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm mb-6">
              <h1 className="font-display text-2xl mb-1">Report Generation Logs</h1>
              <p className="text-zinc-500 text-sm">Viewing history for <span className="font-medium text-zinc-900">{selectedUsageCustomer}</span></p>
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 text-zinc-500 font-medium">
                  <tr>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Tokens / Cost</th>
                    <th className="px-6 py-3 font-mono text-[10px] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {MOCK_GENERATED_REPORTS.filter(r => r.customer === selectedUsageCustomer).map((report) => (
                    <tr key={report.id} className="hover:bg-zinc-50/50">
                      <td className="px-6 py-4 font-mono text-zinc-500 text-xs">{report.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          report.type === 'Detailed' ? 'bg-violet-100 text-violet-700' : 'bg-zinc-100 text-zinc-700'
                        }`}>
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-900 font-medium">{report.vehicle}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-mono text-zinc-900">{report.tokens.toLocaleString()} tks</span>
                          <span className="text-[10px] font-mono text-zinc-500">{report.cost}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{renderStatus(report.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleViewReport(report)}
                          className="text-zinc-400 hover:text-violet-600 transition-colors"
                          title="View Report"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {MOCK_GENERATED_REPORTS.filter(r => r.customer === selectedUsageCustomer).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No report history found for this user.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Feedback Detail Modal */}
        {selectedFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <h2 className="font-display text-xl">Feedback Details</h2>
                <button 
                  onClick={() => setSelectedFeedback(null)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-xl font-display text-zinc-400">
                    {selectedFeedback.customer.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-zinc-900">{selectedFeedback.customer}</h3>
                    <p className="text-sm text-zinc-500 font-mono">{selectedFeedback.date}</p>
                  </div>
                  <div className="ml-auto">
                    {selectedFeedback.type === 'positive' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100">
                        <ThumbsDown className="w-4 h-4" />
                        Not Helpful
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 mb-6">
                  <p className="text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap">{selectedFeedback.comment}</p>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setSelectedFeedback(null)}
                    className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      const report = MOCK_GENERATED_REPORTS.find(r => r.id === selectedFeedback.reportId);
                      if (report) {
                        handleViewReport(report);
                        setSelectedFeedback(null); // Close feedback modal when opening report
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Related Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Viewer Modal */}
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-zinc-100 shrink-0">
                <div>
                  <h2 className="font-display text-xl">Vehicle History Report</h2>
                  <p className="text-sm text-zinc-500 font-mono mt-1">{selectedReport.id} • {selectedReport.date}</p>
                </div>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
                <div className="max-w-5xl mx-auto">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 font-mono text-[10px] tracking-widest uppercase mb-4">
                        {selectedReport.type === "Detailed" ? "Detailed Diagnostic Report" : "Basic Report"}
                      </div>
                      <h1 className="font-display text-5xl tracking-tight mb-2 uppercase">
                        {selectedReport.vehicle}
                      </h1>
                      <div className="flex gap-4 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                        <span>42,150 MILES</span>
                        <span>•</span>
                        <span>$15,000</span>
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
                    <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
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
                        {selectedReport.type === "Detailed" && (
                          <li className="flex items-start gap-3 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>Panel alignment within spec</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Mechanical */}
                    <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="font-mono text-sm tracking-widest uppercase font-bold">Mechanical</h3>
                      </div>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-zinc-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Engine timing normal</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-zinc-600">
                          <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>Transmission fluid aging</span>
                        </li>
                        {selectedReport.type === "Detailed" && (
                          <li className="flex items-start gap-3 text-sm text-zinc-600">
                            <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>Brake pads at 40% life</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Financial */}
                    <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
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
                        {selectedReport.type === "Detailed" && (
                          <li className="flex items-start gap-3 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>Low projected depreciation</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
                    <p className="text-xs text-zinc-400 italic">This is a snapshot of the report generated on {selectedReport.date}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-zinc-100 flex justify-end gap-3 shrink-0">
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
