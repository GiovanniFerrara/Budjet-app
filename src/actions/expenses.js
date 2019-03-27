import db from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const fetchExpenses = (expenses) => ({
  type: 'FETCH_EXPENSES',
  expenses
})

export const startFetchExpenses = () => {
  return (dispatch) => {
    return db.ref('expenses')
      .once('value')
      .then(snapshot => {
        const expenses = snapshot.val();
        const expensesArray = mapExpensesToArray(expenses)
        dispatch(fetchExpenses(expensesArray))
      })
      .catch(e => console.log(e))
  }
}
// ADD ASYNCLY IN DB AND STORE
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
  return (dispatch) => {
    dispatch(removeExpense({ id }))

    return db.ref(`expenses/${id}`).remove()
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


// ======== UTILS FUNCTIONS =========
const addId = (expense, id) => ({
  ...expense,
  id
})

const mapExpensesToArray = (expensesDoc) => {
  const expenses = [];
  for (let key in expensesDoc) {
    expenses.push({
      ...expensesDoc[key],
      id: key
    })
  }
  return [...expenses]
}