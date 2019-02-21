import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const ExpenseListItem = ({ description, amount, id, createdAt, dispatch }) => {
  return (
    <div>
      <h3><Link to={"edit/" + id}>{description}</Link></h3>
      <p> {amount / 100} -  {moment(createdAt).format('DD-MMMM-YYYY')} </p>
    </div>
  );
}


export default ExpenseListItem;
