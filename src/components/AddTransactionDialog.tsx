import { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PlusCircle } from "lucide-react";
import { Transaction } from "../types";

interface AddTransactionDialogProps {
  onAdd: (transaction: Omit<Transaction, 'id' | 'userId' | 'date'>) => void;
}

const CATEGORIES = [
  "Food",
  "Transport",
  "Rent",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Salary",
  "Other",
];

export const AddTransactionDialog = ({ onAdd }: AddTransactionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'income' | 'expense' | 'savings'>('expense');
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;
    
    onAdd({
      type,
      amount: parseFloat(amount),
      category,
      description,
    });
    
    setOpen(false);
    setAmount("");
    setCategory("Other");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-lg shadow-indigo-500/20">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(v: any) => setType(v)}>
              <SelectTrigger className="bg-black/20 border-white/10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">₹</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/20 border-white/10 pl-7"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-black/20 border-white/10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-black/20 border-white/10"
              placeholder="e.g. Monthly rent, Grocery shopping"
            />
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4">
            Save Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
