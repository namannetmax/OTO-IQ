import React from "react";
import { motion } from "motion/react";
import { X, CreditCard, Clock, ArrowRight, ExternalLink, ShieldCheck, Receipt } from "lucide-react";

interface StripeBillingPortalMockProps {
  onClose: () => void;
  userEmail: string;
  currentPlan: string;
}

export default function StripeBillingPortalMock({ onClose, userEmail, currentPlan }: StripeBillingPortalMockProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-4xl h-[85vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-zinc-50 border-r border-zinc-100 p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
            <span className="font-bold text-zinc-900 tracking-tight">CarWise AI</span>
          </div>

          <nav className="space-y-1 flex-1">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-white shadow-sm border border-zinc-200 text-sm font-medium text-zinc-900 flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-zinc-500" />
              Billing
            </button>
          </nav>

          <div className="pt-8 border-t border-zinc-200 mt-auto">
            <button 
              onClick={onClose}
              className="w-full flex items-center justify-between text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-medium"
            >
              Return to CarWise AI
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-1">Billing</h2>
              <p className="text-zinc-500 text-sm">Manage your billing information and view your invoices.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          <div className="space-y-10">
            {/* Current Plan */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Current Plan</h3>
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-zinc-900">{currentPlan === "pro" ? "Advance Plan" : "Essential Plan"}</span>
                    <span className="px-2 py-0.5 bg-zinc-200 rounded text-[10px] font-bold text-zinc-600 uppercase">Active</span>
                  </div>
                  <p className="text-zinc-500 text-sm">{currentPlan === "pro" ? "$49.00 per month" : "Free forever"}</p>
                </div>
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Update plan
                </button>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Payment Method</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-6 bg-zinc-100 rounded flex items-center justify-center border border-zinc-200">
                      <span className="text-[8px] font-bold text-zinc-400 italic">VISA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">Visa ending in 4242</p>
                      <p className="text-xs text-zinc-500">Expires 12/2026</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-zinc-50 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2">
                  + Add payment method
                </button>
              </div>
            </section>

            {/* Billing Information */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Billing Information</h3>
              <div className="p-6 border border-zinc-200 rounded-2xl space-y-4">
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Email</p>
                  <p className="text-sm text-zinc-900">{userEmail}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Address</p>
                  <p className="text-sm text-zinc-900">123 AI Street, Silicon Valley, CA 94025</p>
                </div>
                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Update information
                </button>
              </div>
            </section>

            {/* Invoice History */}
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Invoice History</h3>
              <div className="border border-zinc-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-zinc-900">Date</th>
                      <th className="px-6 py-3 font-semibold text-zinc-900">Amount</th>
                      <th className="px-6 py-3 font-semibold text-zinc-900">Status</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="px-6 py-4 text-zinc-500">Feb 27, 2026</td>
                      <td className="px-6 py-4 text-zinc-900 font-medium">$49.00</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">Paid</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-zinc-50 rounded-lg transition-colors">
                          <Receipt className="w-4 h-4 text-zinc-400" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-zinc-500">Jan 27, 2026</td>
                      <td className="px-6 py-4 text-zinc-900 font-medium">$49.00</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">Paid</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-zinc-50 rounded-lg transition-colors">
                          <Receipt className="w-4 h-4 text-zinc-400" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="mt-20 pt-8 border-t border-zinc-100 flex items-center justify-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-medium">Secured by Stripe</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
