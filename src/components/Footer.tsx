export const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 border-t border-white/10 bg-black/20 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">E</span>
          </div>
          <span className="text-white/60 text-sm font-medium">Expense Tracker</span>
        </div>
        <p className="text-white/30 text-xs text-center">
          &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved. 
          Designed with elegance for your financial clarity.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</a>
          <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
