import { editExpense } from "../actions/expenses";

// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {

    case 'ADD_EXPENSE':
      return addExpense(state, action.expense);

    case 'REMOVE_EXPENSE':
      return removeExpense(state, action.id)

    case 'EDIT_EXPENSE':
      return editExpenseById(state, action.id, action.updates)

    case 'FETCH_EXPENSES':
      return setExpenses(action.expenses)

    default:
      return state;
  }
};

const setExpenses = (expenses) => {
  return expenses
}

const addExpense = (state, expenseObj) => {
  return [...state, expenseObj]
}

const removeExpense = (state, expenseId) => {
  return state.filter(({ id }) => id !== expenseId)
}

const editExpenseById = (state, id, expenseUpdatesObj) => {
  return state.map((expense) => {
    if (expense.id === id) {
      return {
        ...expense,
        ...expenseUpdatesObj
      };
    } else {
      return expense;
    };
  });
}