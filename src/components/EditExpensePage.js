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
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onClickRemove}>Remove Expense</button>
        </div>
      </div>
    );
  }
};

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