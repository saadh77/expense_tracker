
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import TransactionsTable from '@/components/transactions/TransactionsTable';
import AddTransactionForm from '@/components/transactions/AddTransactionForm';
import { Transaction } from '@/types/transaction';
import { mockTransactions } from '@/data/mockData';

const Transactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

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
  
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast({
      title: "Transaction deleted",
      description: "Transaction has been deleted successfully.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
      </div>
      
      <TransactionsTable 
        transactions={transactions} 
        onDeleteTransaction={handleDeleteTransaction} 
      />
    </div>
  );
};

export default Transactions;
