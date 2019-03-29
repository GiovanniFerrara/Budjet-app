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
      calendarFocused: null
    }
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onChangeSelectInput = (e) => {
    e.target.value === "amount" && this.props.sortByAmount();
    e.target.value === "date" && this.props.sortByDate();
  }
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search expenses"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={2}
              isOutsideRange={() => false}
            />
          </div>
        </div>
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
