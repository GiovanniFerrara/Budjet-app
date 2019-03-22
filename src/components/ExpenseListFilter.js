import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setEndDate, setStartDate } from '../actions/filters';
import { DateRangePicker } from "react-dates"
// text: '',
//   sortBy: 'date',
//   startDate: undefined,
//   endDate: undefined

// const ExpenseListFilter = ({ filters, dispatch }) => {
export class ExpenseListFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarFocus: null
    }
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }
  onFocusChange = (calendarFocus) => {
    this.setState(() => ({
      calendarFocus
    }))
  }
  onChangeSelectInput = (e) => {
    e.target.value === "amount" && this.props.sortByAmount();
    e.target.value === "date" && this.props.sortByDate();
  }
  onChangeFilterText = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  render() {
    const { filters } = this.props;
    return (
      <div>
        <input type="text" value={filters.text} onChange={this.onChangeFilterText} />
        <select value={filters.sortBy} onChange={this.onChangeSelectInput}>
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
          isOutsideRange={() => false}
        />
      </div>
    )
  };
}

const mapStateToProps = (state) => (
  { filters: state.filters }
)


const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => { dispatch(setStartDate(startDate)) },
  setEndDate: (endDate) => { dispatch(setEndDate(endDate)) },
  setTextFilter: (text) => { dispatch(setTextFilter(text)) },
  sortByAmount: () => { dispatch(sortByAmount()) },
  sortByDate: () => { dispatch(sortByDate()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);
