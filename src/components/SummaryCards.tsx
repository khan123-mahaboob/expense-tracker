import { Transaction, MonthlySummary } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, PiggyBank, Wallet } from "lucide-react";
import { motion } from "motion/react";

interface SummaryCardsProps {
  summary: MonthlySummary;
}

export const SummaryCards = ({ summary }: SummaryCardsProps) => {
  const cards = [
    {
      title: "Total Income",
      value: summary.totalIncome,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Total Expenses",
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      title: "Total Savings",
      value: summary.totalSavings,
      icon: PiggyBank,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Net Balance",
      value: summary.netSavings,
      icon: Wallet,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-black/40 backdrop-blur-xl border-white/10 text-white hover:bg-white/5 transition-colors cursor-default">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-white/60">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                ₹{card.value.toLocaleString()}
              </div>
              <p className="text-xs text-white/30 mt-1">
                Current month summary
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
