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
import { useMemo } from "react";

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

  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
      
    const totalSavings = transactions
      .filter(t => t.type === 'savings')
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      month: new Date().toLocaleString('default', { month: 'long' }),
      totalIncome,
      totalExpenses,
      totalSavings,
      netSavings: totalIncome - totalExpenses - totalSavings,
    };
  }, [transactions]);

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
              <AddTransactionDialog onAdd={addTransaction} />
            </div>

            <SummaryCards summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white/80 px-1">Recent Transactions</h3>
                  <TransactionsTable transactions={transactions} />
                </div>
              </div>

              <div className="space-y-8">
                <ExpenseChart transactions={transactions} summary={summary} />
                <MonthlyExplanation 
                  transactions={transactions} 
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
