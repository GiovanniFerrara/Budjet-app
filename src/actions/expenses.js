import db from '../firebase/firebase';
import moment from 'moment';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const setExpenses = (expenses) => ({
  type: 'FETCH_EXPENSES',
  expenses
})

export const startFetchExpenses = () => {
  return (dispatch, getState) => {
    const userId = getState().auth.id;
    return db.ref(`users/${userId}/expenses`)
      .once('value')
      .then(snapshot => {
        const expensesArray = []
        snapshot.forEach((childSnapshot) => {
          expensesArray.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        return expensesArray
      })
      .then((expensesArray) => {
        dispatch(setExpenses(expensesArray))
      })
      .catch(e => console.log(e))
  }
}
// ADD ASYNCLY IN DB AND STORE
export const startAddExpense = (expenseObj = {}) => {
  return (dispatch, getState) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseObj;
    const userId = getState().auth.id;
    const expense = { description, note, amount, createdAt }
    return db.ref(`users/${userId}/expenses`)
      .push(expense)
      .then((ref) => {
        const expenseWithId = addId(expense, ref.key);
        dispatch(addExpense(expenseWithId))
      })
      .catch(e => console.log(e))
  }
}


// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpenses = ({ id } = {}) => {
  return (dispatch, getState) => {
    const userId = getState().auth.id;
    dispatch(removeExpense({ id }))
    return db.ref(`users/${userId}/expenses/${id}`).remove()
      .then(() => {
        dispatch(removeExpense({ id }))
      })
  }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates = {}) => {
  const {
    description = "",
    amount = 0,
    note = "",
    createdAt = 0,
  } = updates
  return (dispatch, getState) => {
    const userId = getState().auth.id;
    return db.ref(`users/${userId}/expenses/${id}`).set(updates).then(() => {
      dispatch(editExpense(id, updates))
    })
  }
}

// ======== UTILS FUNCTIONS =========
const addId = (expense, id) => ({
  ...expense,
  id
})

export const mapExpensesToArray = (expensesDoc) => {
  const expenses = [];
  for (let key in expensesDoc) {
    expenses.push({
      ...expensesDoc[key],
      id: key
    })
  }
  return [...expenses]
}