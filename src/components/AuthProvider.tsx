import React, { createContext, useContext, useEffect, useState } from "react";
import { Transaction, UserProfile } from "../types";
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  user: { uid: string; email: string; displayName: string; photoURL?: string } | null;
  loading: boolean;
  userProfile: UserProfile | null;
  transactions: Transaction[];
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUp: (username: string, email: string, pass: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId' | 'date'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load initial state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('et_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      const profiles = JSON.parse(localStorage.getItem('et_profiles') || '{}');
      setUserProfile(profiles[parsedUser.uid] || null);
      
      const allTransactions = JSON.parse(localStorage.getItem('et_transactions') || '[]');
      setTransactions(allTransactions.filter((t: Transaction) => t.userId === parsedUser.uid));
    }
    setLoading(false);
  }, []);

  // Persist transactions
  useEffect(() => {
    if (user) {
      const allTransactions = JSON.parse(localStorage.getItem('et_transactions') || '[]');
      const otherTransactions = allTransactions.filter((t: Transaction) => t.userId !== user.uid);
      localStorage.setItem('et_transactions', JSON.stringify([...otherTransactions, ...transactions]));
    }
  }, [transactions, user]);

  const signInWithGoogle = async () => {
    const mockUser = {
      uid: 'google-user-123',
      email: 'google.user@example.com',
      displayName: 'Google Explorer',
      photoURL: 'https://picsum.photos/seed/google/200'
    };
    setUser(mockUser);
    localStorage.setItem('et_user', JSON.stringify(mockUser));
    
    const profiles = JSON.parse(localStorage.getItem('et_profiles') || '{}');
    if (!profiles[mockUser.uid]) {
      const newProfile = { uid: mockUser.uid, username: 'Google Explorer', email: mockUser.email };
      profiles[mockUser.uid] = newProfile;
      localStorage.setItem('et_profiles', JSON.stringify(profiles));
      setUserProfile(newProfile);
    } else {
      setUserProfile(profiles[mockUser.uid]);
    }
  };

  const signInWithEmail = async (email: string, _pass: string) => {
    const users = JSON.parse(localStorage.getItem('et_registered_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      const authUser = { uid: existingUser.uid, email: existingUser.email, displayName: existingUser.username };
      setUser(authUser);
      localStorage.setItem('et_user', JSON.stringify(authUser));
      
      const profiles = JSON.parse(localStorage.getItem('et_profiles') || '{}');
      setUserProfile(profiles[authUser.uid]);
      
      const allTransactions = JSON.parse(localStorage.getItem('et_transactions') || '[]');
      setTransactions(allTransactions.filter((t: Transaction) => t.userId === authUser.uid));
    } else {
      throw new Error("User not found. Please sign up.");
    }
  };

  const signUp = async (username: string, email: string, _pass: string) => {
    const users = JSON.parse(localStorage.getItem('et_registered_users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      throw new Error("User already exists.");
    }

    const uid = uuidv4();
    const newUser = { uid, username, email };
    users.push(newUser);
    localStorage.setItem('et_registered_users', JSON.stringify(users));

    const authUser = { uid, email, displayName: username };
    setUser(authUser);
    localStorage.setItem('et_user', JSON.stringify(authUser));

    const newProfile = { uid, username, email };
    const profiles = JSON.parse(localStorage.getItem('et_profiles') || '{}');
    profiles[uid] = newProfile;
    localStorage.setItem('et_profiles', JSON.stringify(profiles));
    setUserProfile(newProfile);
    setTransactions([]);
  };

  const logOut = async () => {
    setUser(null);
    setUserProfile(null);
    setTransactions([]);
    localStorage.removeItem('et_user');
  };

  const updateProfile = async (newProfileData: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    const updatedProfile = { ...userProfile, ...newProfileData };
    setUserProfile(updatedProfile);
    
    const profiles = JSON.parse(localStorage.getItem('et_profiles') || '{}');
    profiles[user.uid] = updatedProfile;
    localStorage.setItem('et_profiles', JSON.stringify(profiles));
  };

  const addTransaction = async (tx: Omit<Transaction, 'id' | 'userId' | 'date'>) => {
    if (!user) return;
    const newTx: Transaction = {
      ...tx,
      id: uuidv4(),
      userId: user.uid,
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ 
      user: user as any, 
      loading, 
      userProfile, 
      transactions, 
      signInWithGoogle, 
      signInWithEmail, 
      signUp, 
      logOut,
      updateProfile,
      addTransaction
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
