import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses'
const AddExpensePage = ({dispatch,history}) => (
  <div>
    This is from my add expense component
    <ExpenseForm onSubmit ={ (expense)=> {
      dispatch(addExpense(expense));
      history.push("/")
    }} />
  </div>
);

export default connect()(AddExpensePage)
