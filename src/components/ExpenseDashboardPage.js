import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilter from './ExpenseListFilter';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseList />
    <ExpenseListFilter />
    <button onClick={() => {
      console.log(process.env.FIREBASE_API_KEY)
    }}>click</button>
  </div>
);

export default ExpenseDashboardPage;
