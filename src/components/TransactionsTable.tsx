import { Transaction } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "../lib/utils";
import { format } from "date-fns";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-white/5">
            <TableHead className="text-white/70">Date</TableHead>
            <TableHead className="text-white/70">Type</TableHead>
            <TableHead className="text-white/70">Description</TableHead>
            <TableHead className="text-white/70">Category</TableHead>
            <TableHead className="text-right text-white/70">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-white/40 py-8">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="text-white/80">
                  {format(new Date(transaction.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                    transaction.type === "income" ? "bg-emerald-500/20 text-emerald-400" : 
                    transaction.type === "expense" ? "bg-rose-500/20 text-rose-400" : 
                    "bg-blue-500/20 text-blue-400"
                  )}>
                    {transaction.type}
                  </span>
                </TableCell>
                <TableCell className="text-white/80">{transaction.description}</TableCell>
                <TableCell className="text-white/80">
                  <span className="px-2 py-1 rounded-full bg-white/5 text-xs">
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium",
                    transaction.type === "income" ? "text-emerald-400" : 
                    transaction.type === "expense" ? "text-rose-400" : "text-blue-400"
                  )}
                >
                  {transaction.type === "expense" ? "-" : "+"}
                  ₹{transaction.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
