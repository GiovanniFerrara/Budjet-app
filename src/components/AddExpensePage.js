import React, { Component } from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses'

export class AddExpensePage extends Component {

  onSubmit = (expense) => {
    this.props.startAddExpense(expense)
    this.props.history.push("/dashboard")
  }
  render() {
    return (
      <div>
        This is from my add expense component
    <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => {
    dispatch(startAddExpense(expense))
  }
}
)

export default connect(undefined, mapDispatchToProps)(AddExpensePage)
