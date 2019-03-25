import uuid from 'uuid';
import db from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseObj = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseObj;
    const expense = { description, note, amount, createdAt }
    return db.ref('expenses')
      .push(expense)
      .then((ref) => {
        dispatch(addExpense({
          ...expense,
          id: ref.key
        }))
      })
      .catch(e => console.log(e))
  }
}


// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
