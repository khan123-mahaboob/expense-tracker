export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'savings';
  amount: number;
  category: string;
  description: string;
  date: string; // ISO string
  userId: string;
}

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  profilePic?: string;
}

export interface MonthlySummary {
  month: string;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  netSavings: number;
}
