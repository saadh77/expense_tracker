
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import AddTransactionForm from '@/components/transactions/AddTransactionForm';
import { Transaction } from '@/types/transaction';
import { mockTransactions, mockMonthlyData, mockCategoryData } from '@/data/mockData';

const Dashboard = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  
  // Calculate totals
  const currentMonth = new Date().getMonth();
  const currentMonthTransactions = transactions.filter(t => {
    const transactionMonth = new Date(t.date).getMonth();
    return transactionMonth === currentMonth;
  });
  
  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalBalance = totalIncome - totalExpenses;
  
  // Mock percentage changes (would be calculated from historical data in a real app)
  const balanceChange = 8.5;
  const incomeChange = 5.2;
  const expensesChange = -2.8;

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction = {
      ...newTransaction,
      id: `tr-${transactions.length + 1}-${Date.now()}`,
    };
    
    setTransactions(prev => [transaction, ...prev]);
    toast({
      title: "Transaction added",
      description: `${newTransaction.type === 'expense' ? 'Expense' : 'Income'} of ${newTransaction.amount} added successfully.`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
      </div>
      
      <DashboardSummary
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balanceChange={balanceChange}
        incomeChange={incomeChange}
        expensesChange={expensesChange}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ExpenseChart 
          monthlyData={mockMonthlyData}
          categoryData={mockCategoryData}
        />
        <RecentTransactions transactions={transactions.slice(0, 10)} />
      </div>
    </div>
  );
};

export default Dashboard;
