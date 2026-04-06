import { GoogleGenAI } from "@google/genai";
import { Transaction, MonthlySummary } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function getExpenseExplanation(
  transactions: Transaction[],
  summary: MonthlySummary
) {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    As a financial advisor, analyze the following monthly financial data and provide a concise, encouraging explanation of the user's spending habits, savings, and areas for improvement.
    
    Total Income: ₹${summary.totalIncome}
    Total Expenses: ₹${summary.totalExpenses}
    Total Savings: ₹${summary.totalSavings}
    Net Savings (Income - Expenses): ₹${summary.netSavings}
    
    Recent Transactions:
    ${transactions.slice(0, 10).map(t => `- ${t.type}: ₹${t.amount} (${t.category}) - ${t.description}`).join('\n')}
    
    Please provide:
    1. A summary of the month's performance.
    2. Specific insights on spending categories.
    3. Advice on how to increase savings.
    4. A motivational closing statement.
    
    Keep the tone professional yet friendly and classy.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't generate a financial analysis at this time. Please check your transactions and try again.";
  }
}
