import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem'
import getVisibleExpenses from '../selectors/expenses';
import { startFetchExpenses } from '../actions/expenses'

export class ExpenseList extends Component {
  render() {
    return (
      <div>
        <h1>Expense List</h1>
        {this.props.expenses.length === 0 ?
          <p>No expenses found</p> :
          this.props.expenses.map((item) => (
            <ExpenseListItem {...item} key={item.id} />
          ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { expenses: getVisibleExpenses(state.expenses, state.filters) }
};

export default connect(mapStateToProps)(ExpenseList);
