import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
            <span className="text-white font-bold text-5xl">E</span>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-indigo-500/20 rounded-full border-t-indigo-500"
          />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Expense Tracker</h2>
          <p className="text-white/40 text-sm flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Preparing your financial dashboard...
          </p>
        </div>
      </motion.div>
    </div>
  );
};
