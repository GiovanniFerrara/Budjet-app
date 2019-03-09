import React, { PureComponent } from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses'

class EditExpensePage extends PureComponent {

  onSubmit = (newExpense) => {
    this.props.editExpense(this.props.expense.id, newExpense)
    console.log(this.props.expense.id, newExpense)
    this.props.history.push("/")
  }
  onRemoveClick = () => {
    this.props.removeExpense(this.props.expense)
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
        <button onClick={this.onRemoveClick}>
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
  removeExpense: (newExpense) => dispatch(removeExpense(newExpense)),
}
)
export default connect(mapStateToProps, mapDispatchToProp)(EditExpensePage)
