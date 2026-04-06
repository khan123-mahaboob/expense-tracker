import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getExpenseExplanation } from "../lib/gemini";
import { Transaction, MonthlySummary } from "../types";

interface MonthlyExplanationProps {
  transactions: Transaction[];
  summary: MonthlySummary;
}

export const MonthlyExplanation = ({ transactions, summary }: MonthlyExplanationProps) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await getExpenseExplanation(transactions, summary);
    setExplanation(result || "No explanation available.");
    setLoading(false);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-xl border-white/10 text-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-amber-400" />
          AI Financial Insights
        </CardTitle>
        <Button 
          onClick={handleGenerate} 
          disabled={loading || transactions.length === 0}
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Analyze Month"}
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {explanation ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="prose prose-invert max-w-none"
            >
              <div className="text-white/80 leading-relaxed whitespace-pre-wrap">
                {explanation}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 text-white/40 italic">
              Click the button above to get an AI-powered analysis of your spending and savings.
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
