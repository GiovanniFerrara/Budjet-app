import React, { Component } from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'

const now = moment();
console.log(now.format("Do - MMM - YYYY"))

class ExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        description: props.expense?  props.expense.description : "",
        createdAt: props.expense?  moment(props.expense.createdAt) : moment(),
        amount: props.expense?  (props.expense.amount/100).toString() : 0,
        note: props.expense? props.expense.note : "",
        calendarFocus: false,
        error: "",
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.state.description || !this.state.amount ){
      this.setState(()=>({
        error : "Please enter description and amount"
      }))
    } else {
      this.setState(()=>({
        error : ""
      }))
      this.props.onSubmit({
        description: this.state.description,
        createdAt: this.state.createdAt.valueOf(),
        amount: parseFloat(this.state.amount,10)*100,
        note: this.state.note,
      })
    }
  }
  onDateChange = (createdAt)=>{
    if(createdAt){
      this.setState(()=>({createdAt}))
    }
  }
  onFocusChange = ({focused}) => {
    this.setState(()=> ({calendarFocus: focused}))
  }
  handleInputChange = (e)=>{
    const input = e.target.name;
    const value = e.target.value;
    this.setState(()=>({
      [input]: value,
    }))
  }
  render() {
    return (
      <div>
        {this.state.error && <h4> {this.state.error} </h4>}
        <form onSubmit={this.handleSubmit}>
          <input type="text"
            placeholder="description"
            name="description"
            autoFocus
            onChange={this.handleInputChange}
            noValidate = {true}
            value = {this.state.description}
            
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocus} // PropTypes.bool
            onFocusChange={this.onFocusChange}
            id="your_unique_id" // PropTypes.string.isRequired,
            numberOfMonths={2}
            isOutsideRange = {()=> false}
          />
          <input type="number"
            name="amount"
            placeholder="Amount"
            onChange={this.handleInputChange}
            value = {this.state.amount}
          />
          <textarea type="text"
            name="note"
            placeholder="Notes"
            onChange={this.handleInputChange}
            value = {this.state.note}
          />
          <button> Add Expense </button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
