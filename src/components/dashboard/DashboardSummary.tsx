
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  amount: number;
  change?: number;
  type?: 'income' | 'expense' | 'balance';
}

const SummaryCard = ({ title, amount, change, type = 'balance' }: SummaryCardProps) => {
  const getIcon = () => {
    if (change === undefined) return null;
    
    if (change > 0) {
      return <ArrowUp className={`h-4 w-4 ${type === 'expense' ? 'text-destructive' : 'text-green-500'}`} />;
    } else if (change < 0) {
      return <ArrowDown className={`h-4 w-4 ${type === 'income' ? 'text-destructive' : 'text-green-500'}`} />;
    } else {
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getChangeColor = () => {
    if (change === undefined) return '';
    
    if ((type === 'income' && change > 0) || (type === 'expense' && change < 0) || (type === 'balance' && change > 0)) {
      return 'text-green-500';
    } else if ((type === 'income' && change < 0) || (type === 'expense' && change > 0) || (type === 'balance' && change < 0)) {
      return 'text-destructive';
    } else {
      return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(amount)}</div>
        {change !== undefined && (
          <p className={`text-xs flex items-center mt-1 ${getChangeColor()}`}>
            {getIcon()}
            <span className="ml-1">
              {Math.abs(change)}% from last month
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardSummaryProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  balanceChange?: number;
  incomeChange?: number;
  expensesChange?: number;
}

const DashboardSummary = ({ 
  totalBalance, 
  totalIncome, 
  totalExpenses,
  balanceChange,
  incomeChange,
  expensesChange
}: DashboardSummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SummaryCard 
        title="Total Balance" 
        amount={totalBalance}
        change={balanceChange} 
        type="balance"
      />
      <SummaryCard 
        title="Monthly Income" 
        amount={totalIncome}
        change={incomeChange}
        type="income" 
      />
      <SummaryCard 
        title="Monthly Expenses" 
        amount={totalExpenses}
        change={expensesChange}
        type="expense"
      />
    </div>
  );
};

export default DashboardSummary;
