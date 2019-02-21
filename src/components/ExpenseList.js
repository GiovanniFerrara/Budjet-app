import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem'
import getVisibleExpenses from '../selectors/expenses';

export const ExpenseList = ({ expenses }) => (
  <div>
    <h1>Expense List</h1>
    {expenses.length === 0 ?
      <p>No Expenses added still</p> :
      expenses.map((item) => (
        <ExpenseListItem {...item} key={item.id} />
      ))}
  </div>
);

const mapStateToProps = (state) => {
  return { expenses: getVisibleExpenses(state.expenses, state.filters) }
};

export default connect(mapStateToProps)(ExpenseList);
