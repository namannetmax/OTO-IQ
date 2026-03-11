import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, LogOut, LayoutDashboard, CreditCard, Settings } from "lucide-react";

interface UserMenuProps {
  userName: string;
  onLogout: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAccount: () => void;
  onNavigateToPlans: () => void;
}

export default function UserMenu({ userName, onLogout, onNavigateToProfile, onNavigateToAccount, onNavigateToPlans }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-950 transition-colors font-mono text-[10px] tracking-widest uppercase font-bold"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">{userName}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-56 bg-zinc-950 rounded-2xl shadow-xl shadow-zinc-950/20 border border-zinc-800 py-3 z-50"
          >
            <MenuItem icon={<LayoutDashboard className="w-3 h-3 text-zinc-500" />} label="Profile" onClick={onNavigateToProfile}/>
            <MenuItem icon={<CreditCard className="w-3 h-3 text-zinc-500" />} label="Plans" onClick={onNavigateToPlans}/>
            <MenuItem icon={<Settings className="w-3 h-3 text-zinc-500" />} label="Account" onClick={onNavigateToAccount}/>
            <div className="border-t border-zinc-800 my-1"></div>
            <MenuItem icon={<LogOut className="w-3 h-3 text-rose-500" />} label="Logout" onClick={onLogout} className="text-rose-500"/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

function MenuItem({ icon, label, onClick, className }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 text-xs font-mono tracking-widest uppercase text-zinc-300 hover:bg-zinc-800 w-full text-left transition-colors ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}
