import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Transaction } from "../types";
import { useMemo } from "react";

interface ExpenseChartProps {
  transactions: Transaction[];
  summary: {
    totalIncome: number;
    totalExpenses: number;
    totalSavings: number;
    netSavings: number;
  };
}

export const ExpenseChart = ({ transactions, summary }: ExpenseChartProps) => {
  const data = useMemo(() => {
    const categories: Record<string, number> = {};
    
    transactions.forEach(t => {
      if (t.type === 'expense') {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      } else if (t.type === 'savings') {
        categories['Savings'] = (categories['Savings'] || 0) + t.amount;
      }
    });

    const chartData = Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));

    if (summary.netSavings > 0) {
      chartData.push({
        name: 'Remaining Balance',
        value: summary.netSavings,
      });
    }
      
    return chartData;
  }, [transactions, summary]);

  const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#10b981'];

  return (
    <div className="h-[400px] w-full bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex flex-col">
      <h3 className="text-white/70 text-sm font-medium mb-4">Expenditure Distribution</h3>
      <div className="flex-1 w-full flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#111827', 
                  border: '1px solid #ffffff20',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-white/60 text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-white/30 text-sm italic">No expense or savings data to display.</div>
        )}
      </div>
    </div>
  );
};
