
import { Transaction, ExpenseData, CategoryData } from '@/types/transaction';

const currentDate = new Date();
const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

export const mockTransactions: Transaction[] = [
  {
    id: 'tr-1',
    description: 'Grocery shopping',
    amount: 95.5,
    category: 'food',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1).toISOString()
  },
  {
    id: 'tr-2',
    description: 'Salary',
    amount: 3000,
    category: 'salary',
    type: 'income',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString()
  },
  {
    id: 'tr-3',
    description: 'Electric bill',
    amount: 85.2,
    category: 'utilities',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5).toISOString()
  },
  {
    id: 'tr-4',
    description: 'Movie tickets',
    amount: 30,
    category: 'entertainment',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8).toISOString()
  },
  {
    id: 'tr-5',
    description: 'Restaurant dinner',
    amount: 68.5,
    category: 'food',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 12).toISOString()
  },
  {
    id: 'tr-6',
    description: 'Freelance work',
    amount: 450,
    category: 'freelance',
    type: 'income',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15).toISOString()
  },
  {
    id: 'tr-7',
    description: 'Mobile phone bill',
    amount: 45,
    category: 'utilities',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18).toISOString()
  },
  {
    id: 'tr-8',
    description: 'Gas',
    amount: 35.8,
    category: 'transport',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20).toISOString()
  },
  {
    id: 'tr-9',
    description: 'New shoes',
    amount: 89.99,
    category: 'shopping',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22).toISOString()
  },
  {
    id: 'tr-10',
    description: 'Gift from parents',
    amount: 200,
    category: 'gift',
    type: 'income',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25).toISOString()
  },
  {
    id: 'tr-11',
    description: 'Internet bill',
    amount: 60,
    category: 'utilities',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10).toISOString()
  },
  {
    id: 'tr-12',
    description: 'Coffee shop',
    amount: 4.5,
    category: 'food',
    type: 'expense',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 2).toISOString()
  },
];

export const mockMonthlyData: ExpenseData[] = [
  { month: 'Jan', amount: 850 },
  { month: 'Feb', amount: 920 },
  { month: 'Mar', amount: 780 },
  { month: 'Apr', amount: 810 },
  { month: 'May', amount: 730 },
  { month: 'Jun', amount: 950 },
  { month: 'Jul', amount: 690 },
  { month: 'Aug', amount: 720 },
  { month: 'Sep', amount: 880 },
  { month: 'Oct', amount: 840 },
  { month: 'Nov', amount: 790 },
  { month: 'Dec', amount: 920 }
];

const totalCategoryAmount = 850;

export const mockCategoryData: CategoryData[] = [
  { category: 'Food', amount: 250, percentage: Math.round(250 / totalCategoryAmount * 100) },
  { category: 'Utilities', amount: 180, percentage: Math.round(180 / totalCategoryAmount * 100) },
  { category: 'Transport', amount: 120, percentage: Math.round(120 / totalCategoryAmount * 100) },
  { category: 'Entertainment', amount: 95, percentage: Math.round(95 / totalCategoryAmount * 100) },
  { category: 'Shopping', amount: 135, percentage: Math.round(135 / totalCategoryAmount * 100) },
  { category: 'Health', amount: 70, percentage: Math.round(70 / totalCategoryAmount * 100) }
];

export const mockDailyData = Array.from({ length: 30 }, (_, i) => {
  const day = daysInMonth - i;
  const date = day < 10 ? `0${day}` : `${day}`;
  const randomAmount = Math.floor(Math.random() * 40) + 10;
  return {
    date: `${date}/${currentDate.getMonth() + 1}`,
    amount: randomAmount
  };
}).reverse();
