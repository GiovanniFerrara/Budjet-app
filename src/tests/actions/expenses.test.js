import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startFetchExpenses,
  startRemoveExpenses,
  startEditExpense
} from '../../actions/expenses';
import configMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase'
import expenses from '../fixtures/expenses'

// Define global variables
const createMockStore = configMockStore([thunk]);
const userId = 'ifuckinlovepastacumatarocco';
const defaultAuthState = { auth: { id: userId } };

// Define variables to clean up before each test suite
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, createdAt, amount }) => {
    expensesData[id] = { description, note, createdAt, amount }
  })
  db.ref(`users/${userId}/expenses`)
    .set(expensesData)
    .then(() => {
      done()
    })

})

// Start testing here
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

test('should remove expenses from the db and call removeExpese({id})', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  store.dispatch(startRemoveExpenses({ id }))
    .then(() => {
      const actions = store.getActions()
      const removeExpenseAction = actions[0];
      expect(removeExpenseAction).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      })
      return db.ref(`users/${userId}/expenses/${id}`).once('value')
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy()
      done()
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

test('should update data in DB and dispatch editExpense(id,update)', (done) => {
  const id = expenses[2].id;
  const updateObj = {
    note: "hey",
    createdAt: 0,
    description: 'this is the update',
    amount: 1212
  }
  const store = createMockStore(defaultAuthState);
  store.dispatch(startEditExpense(id, updateObj)).then(() => {
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: "EDIT_EXPENSE",
      id,
      updates: updateObj
    })
    return db.ref(`users/${userId}/expenses/${id}`).once('value')
  })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(updateObj)
      done()
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
  const store = createMockStore(defaultAuthState);
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
      return db.ref(`users/${userId}/expenses/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot => {
      const expense = snapshot.val()
      expect(expense).toEqual(expenseData)
      done()
    })
})

test('should dispatch startAddExpense and and save the data in the DB, with default values', (done) => {
  const expense = {};
  const store = createMockStore(defaultAuthState)
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
      return db.ref(`users/${userId}/expenses/${action.expense.id}`).once('value')
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

test('should setup setExpenses action ', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'FETCH_EXPENSES',
    expenses
  })
})

test('should setExpenses in the store fetching from the DB', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startFetchExpenses())
    .then(() => {
      const action = store.getActions()[0];
      return action
    })
    .then((action) => {
      const expensesFromActionObj = action.expenses;
      const actionType = action.type;
      expect(actionType).toBe('FETCH_EXPENSES');
      expect(expensesFromActionObj).toEqual(expenses);
      db.ref('expenses').once('value')
        .then((snapshot) => {
          const expensesDocs = snapshot.val()
          expect(mapExpensesToArray(expensesDocs)).toEqual(expenses)
          done()
        })
    })
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