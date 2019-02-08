import {addExpense,editExpense,removeExpense} from '../../actions/expenses';

test("should setup remove expense action object",()=>{
  const action = removeExpense({id:55});
  expect(typeof action==="object")
    .toBeTruthy()
  expect(action)
    .toEqual({
      type: 'REMOVE_EXPENSE',
      id: 55
    })
})

test("should setup edit expense action object",()=>{
  const updateObj = {
    description: "heyman",
    createdAt: "now"
  }
  const action = editExpense(55,updateObj);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id:55,
    updates: updateObj
  })
})

test("should setup action object with custom values",()=>{
  const expense = {
    description: "Rent",
    note: "It's expensive",
    amount: 55,
    createdAt : Date.now(),
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

test("should setup action object with default values",()=>{
  const expense = {}
  const action = addExpense(expense);
  expect(action)
    .toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id:expect.any(String),
        description: "",
        note: "",
        amount: 0,
        createdAt : 0,
      }
    })
})