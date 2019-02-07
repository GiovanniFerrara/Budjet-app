import React from 'react';
import {connect} from 'react-redux'
import {removeExpense} from '../actions/expenses'
const ExpenseListItem = ({description,amount, id,createdAt,dispatch}) => {
  return (
    <div>
        <h1>{description}</h1>
        <p> {amount} -  {createdAt} </p>
        <button onClick={()=>dispatch(removeExpense({id}))}> Remove </button>
    </div>
  );
}


export default connect()(ExpenseListItem)
