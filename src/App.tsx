import { AnimatedBackground } from "./components/AnimatedBackground";
import { Auth } from "./components/Auth";
import { DashboardLayout } from "./components/DashboardLayout";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { Header } from "./components/Header";
import { SummaryCards } from "./components/SummaryCards";
import { TransactionsTable } from "./components/TransactionsTable";
import { ExpenseChart } from "./components/ExpenseChart";
import { AddTransactionDialog } from "./components/AddTransactionDialog";
import { MonthlyExplanation } from "./components/MonthlyExplanation";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";

function AppContent() {
  const { 
    user, 
    loading, 
    userProfile, 
    transactions, 
    signInWithGoogle, 
    signInWithEmail, 
    signUp, 
    logOut,
    updateProfile,
    addTransaction
  } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"));

  const monthOptions = useMemo(() => {
    const options = [];
    for (let i = 0; i < 12; i++) {
      const date = subMonths(new Date(), i);
      options.push({
        label: format(date, "MMMM yyyy"),
        value: format(date, "yyyy-MM"),
      });
    }
    return options;
  }, []);

  const filteredTransactions = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const date = new Date(year, month - 1);
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    return transactions.filter(t => {
      const txDate = parseISO(t.date);
      return isWithinInterval(txDate, { start, end });
    });
  }, [transactions, selectedMonth]);

  const summary = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const totalExpenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
      
    const totalSavings = filteredTransactions
      .filter(t => t.type === 'savings')
      .reduce((acc, t) => acc + t.amount, 0);

    const [year, month] = selectedMonth.split('-').map(Number);
    const date = new Date(year, month - 1);

    return {
      month: format(date, "MMMM"),
      totalIncome,
      totalExpenses,
      totalSavings,
      netSavings: totalIncome - totalExpenses - totalSavings,
    };
  }, [filteredTransactions, selectedMonth]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30">
      <AnimatedBackground />
      <Header 
        user={user} 
        userProfile={userProfile} 
        onSignOut={logOut} 
        onUpdateProfile={updateProfile} 
      />
      
      <div className="flex-1">
        {!user ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
            <Auth 
              onGoogleSignIn={signInWithGoogle}
              onEmailSignIn={signInWithEmail}
              onPhoneSignIn={(p) => console.log("Phone sign in", p)}
              onSignUp={signUp}
            />
          </div>
        ) : (
          <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  Welcome back, {userProfile?.username || "Financial Explorer"}
                </h2>
                <p className="text-white/40 text-sm mt-1">
                  Here's what's happening with your finances this {summary.month}.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    {monthOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <AddTransactionDialog onAdd={addTransaction} />
              </div>
            </div>

            <SummaryCards summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white/80 px-1">
                    {summary.month} Transactions
                  </h3>
                  <TransactionsTable transactions={filteredTransactions} />
                </div>
              </div>

              <div className="space-y-8">
                <ExpenseChart transactions={filteredTransactions} summary={summary} />
                <MonthlyExplanation 
                  transactions={filteredTransactions} 
                  summary={summary} 
                />
              </div>
            </div>
          </DashboardLayout>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
