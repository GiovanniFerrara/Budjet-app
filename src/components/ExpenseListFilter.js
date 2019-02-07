import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters';

// text: '',
//   sortBy: 'date',
//   startDate: undefined,
//   endDate: undefined

const ExpenseListFilter = ({ filters, dispatch }) => {

  return (
    <div>
      <input type="text" value={filters.text} onChange={(e) => {
        dispatch(setTextFilter(e.target.value))
      }} />
      <select value={filters.sortBy} onChange={(e) => {
        e.target.value === "amount" && dispatch(sortByAmount());
        e.target.value === "date" && dispatch(sortByDate());
      }}>
        <option value="date">Date</option>
        <option value="amount"> Amount</option>
      </select>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(ExpenseListFilter);
