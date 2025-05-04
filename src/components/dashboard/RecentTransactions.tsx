
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Transaction } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const navigate = useNavigate();
  const [visibleTransactions, setVisibleTransactions] = useState(5);
  
  const getCategoryColorClass = (category: string) => {
    const categories: Record<string, string> = {
      'food': 'bg-orange-500',
      'transport': 'bg-blue-500',
      'entertainment': 'bg-purple-500',
      'shopping': 'bg-pink-500',
      'utilities': 'bg-yellow-500',
      'health': 'bg-green-500',
      'housing': 'bg-indigo-500',
      'income': 'bg-emerald-500',
      'other': 'bg-gray-500'
    };
    
    return categories[category.toLowerCase()] || 'bg-gray-500';
  };

  const showMoreTransactions = () => {
    setVisibleTransactions(prev => prev + 5);
  };

  const goToAllTransactions = () => {
    navigate('/transactions');
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" onClick={goToAllTransactions}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No recent transactions found
            </div>
          ) : (
            <>
              {transactions.slice(0, visibleTransactions).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColorClass(transaction.category)}`}>
                      <span className="text-white font-bold text-xs">
                        {transaction.category.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${transaction.type === 'expense' ? 'text-destructive' : 'text-green-500'}`}>
                    {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
              
              {visibleTransactions < transactions.length && (
                <div className="pt-2 text-center">
                  <Button variant="ghost" size="sm" onClick={showMoreTransactions}>
                    Show More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
