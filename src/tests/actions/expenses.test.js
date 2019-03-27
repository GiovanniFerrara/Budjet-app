import { startAddExpense, addExpense, editExpense, removeExpense, fetchExpenses, startFetchExpenses } from '../../actions/expenses';
import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase'
const createMockStore = configMockStore([thunk]);
import expenses from '../fixtures/expenses'

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, createdAt, amount }) => {
    expensesData[id] = { description, note, createdAt, amount }
  })
  db.ref('expenses')
    .set(expensesData)
    .then(() => {
      done()
    })

})

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: 55 });
  expect(typeof action === "object")
    .toBeTruthy()
  expect(action)
    .toEqual({
      type: 'REMOVE_EXPENSE',
      id: 55
    })
})

test("should setup edit expense action object", () => {
  const updateObj = {
    description: "heyman",
    createdAt: "now"
  }
  const action = editExpense(55, updateObj);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: 55,
    updates: updateObj
  })
})

test("should setup action object with custom values", () => {
  const expense = {
    description: "Rent",
    note: "It's expensive",
    amount: 55,
    id: 'd3rer0',
    createdAt: Date.now(),
  }
  const action = addExpense(expense)
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expense,
      id: expect.any(String)
    }
  })
})

test("should add an expense in the DB and and add it to the mock store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "barca",
    note: "It's cool",
    amount: 3000,
    createdAt: 10000
  };
  store.dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      })
      return db.ref(`expenses/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot => {
      const expense = snapshot.val()
      expect(expense).toEqual(expenseData)
      done()
    })
})

test('should dispatch startAddExpense and and save the data in the DB, with default values', (done) => {
  const expense = {};
  const store = createMockStore({})
  const expectedExpense = {
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      createdAt: 0,
      amount: 0,
    }
  };

  store.dispatch(startAddExpense(expense))
    .then(() => {
      const actions = store.getActions()
      const action = actions[0];
      expect(action).toEqual(expectedExpense)
      return db.ref(`expenses/${action.expense.id}`).once('value')
    })
    .then(snapshot => {
      const expenseInDB = snapshot.val()
      expect(expenseInDB).toEqual({
        description: '',
        note: '',
        createdAt: 0,
        amount: 0,
      })
      done()
    })
})

test('should setup fetchExpenses action ', () => {
  const action = fetchExpenses(expenses);
  expect(action).toEqual({
    type: 'FETCH_EXPENSES',
    expenses
  })
})

test('should dispatch async fetchExpenses', (done) => {
  const store = createMockStore({});
  store.dispatch(startFetchExpenses())
    .then(() => {
      const action = store.getActions()[0];
      return action
    })
    .then((action) => {
      const expensesIntoAction = action.expenses;
      const actionType = action.type;
      expect(actionType).toBe('FETCH_EXPENSES');
      expect(expensesIntoAction).toEqual(expenses);
      done()
    })
})
