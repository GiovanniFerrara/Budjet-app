import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses'

const EditExpensePage = ({dispatch,history,expense,match}) => (
  <div>
    This is from my edit expense component
    <ExpenseForm 
      onSubmit ={ (newExpense)=> {
        console.log(newExpense)
        dispatch(editExpense(expense.id,newExpense));
        history.push("/")
      }}
      expense = {expense}
    />
    
    <button onClick={()=>{
      dispatch(removeExpense({id: expense.id}))
      history.push("/")
    }
      }> Remove </button>
  </div>
);
const mapStateToProps = (state, props)=>({
  expense: state.expenses.find((expense)=>{
    return expense.id = props.match.params.id
  })
})
export default connect(mapStateToProps)(EditExpensePage)
