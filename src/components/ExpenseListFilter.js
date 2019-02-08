import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setEndDate, setStartDate } from '../actions/filters';
import {DateRangePicker} from "react-dates"
// text: '',
//   sortBy: 'date',
//   startDate: undefined,
//   endDate: undefined

// const ExpenseListFilter = ({ filters, dispatch }) => {
class ExpenseListFilter extends Component{
  constructor(props){
    super(props)
    this.state = {
      calendarFocus: null
    }
  }
  onDatesChange= ({startDate,endDate}) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  }
  onFocusChange=(calendarFocus) => {
    this.setState(()=>( {
      calendarFocus
    }))
  }
  render() {
    const { filters, dispatch } = this.props;
    return(
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

      <DateRangePicker
        startDate={filters.startDate} // momentPropTypes.momentObj or null,
        endDate={filters.endDate} // momentPropTypes.momentObj or null,
        onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
        focusedInput={this.state.calendarFocus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
        numberOfMonths={2}
        showClearDates={true}
        isOutsideRange = {()=> false}
      />
    </div>
    )};
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

export default connect(mapStateToProps)(ExpenseListFilter);
