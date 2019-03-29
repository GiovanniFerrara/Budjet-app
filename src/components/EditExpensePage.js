import React, { Component } from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpenses } from '../actions/expenses'

export class EditExpensePage extends Component {

  onSubmit = (newExpense) => {
    this.props.editExpense(this.props.expense.id, newExpense)
    this.props.history.push("/dashboard")
  }
  onClickRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id })
    this.props.history.push("/dashboard")

  }
  render() {
    return (
      <div>
        This is from my edit expense component
    <ExpenseForm
          onSubmit={this.onSubmit}
          expense={this.props.expense}
        />
        <button onClick={this.onClickRemove}>
          Remove
         </button>
      </div >
    )
  }
}

const mapStateToProps = (state, props) => {
  const idFromUrl = props.match.params.id;
  return ({
    expense: findExpenseById(idFromUrl, state.expenses)
  })
}

const mapDispatchToProp = (dispatch) => ({
  editExpense: (id, newExpense) => dispatch(startEditExpense(id, newExpense)),
  removeExpense: (expense) => dispatch(startRemoveExpenses(expense)),
}
)
export default connect(mapStateToProps, mapDispatchToProp)(EditExpensePage)

const findExpenseById = (id, expenses) => {
  let expense;
  expenses.forEach((item) => {
    if (item.id === id) {
      expense = item;
    }
  })
  return expense
}