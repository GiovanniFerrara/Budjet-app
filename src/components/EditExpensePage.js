import React, { Component } from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { editExpense, removeExpense, startRemoveExpenses } from '../actions/expenses'

export class EditExpensePage extends Component {

  onSubmit = (newExpense) => {
    this.props.editExpense(this.props.expense.id, newExpense)
    this.props.history.push("/")
  }
  onClickRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id })
    this.props.history.push("/")

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

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => {
    return expense.id = props.match.params.id
  })
})

const mapDispatchToProp = (dispatch) => ({
  editExpense: (id, newExpense) => dispatch(editExpense(id, newExpense)),
  removeExpense: (expense) => dispatch(startRemoveExpenses(expense)),
}
)
export default connect(mapStateToProps, mapDispatchToProp)(EditExpensePage)
