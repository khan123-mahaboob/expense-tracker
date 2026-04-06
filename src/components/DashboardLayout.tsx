import { ReactNode } from "react";
import { motion } from "motion/react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-6 space-y-8"
    >
      {children}
    </motion.main>
  );
};
