import selectExpenses from '../../selectors/expenses';
import moment from 'moment';

const expensesTest = [
  {
    id: "435345345",
    description: "Gas Bill",
    note: "Gas not payed",
    amount: 5,
    createdAt: moment().add(5,"days"),
  },
  {
    id: "435345345",
    description: "Water Bill",
    note: "Gas not payed",
    amount: 8,
    createdAt: moment().add(7,"days"),
  },
  {
    id: "435345345",
    description: "Rent",
    note: "Gas not payed",
    amount: 4,
    createdAt: moment().add(9,"days"),
  }
]


test('should filter by text value', () => {
  const filterBill = {
    text: "bill",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  }
  const expenses = selectExpenses(expensesTest, filterBill);
  expect(expenses)
    .toEqual([
      expensesTest[1],
      expensesTest[0]
    ])
})

test('should filter by text value', () => {

  const filterCane = {
    text: "cane",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  }
  const expenses = selectExpenses(expensesTest, filterCane);
  expect(expenses.length)
    .toBe(0)
})

test('should filter by startDate', () => {
  const filterStartDate = {
    text: "",
    sortBy: "date",
    startDate: moment().add(6,"days"),
    endDate: undefined
  }
  const expenses = selectExpenses(expensesTest, filterStartDate);
  expect(expenses.length)
    .toBe(2)
})

test('should filter by endDate', () => {
  const filterStartDate = {
    text: "",
    sortBy: "date",
    startDate: "",
    endDate: moment().add(6,"days")
  }
  const expenses = selectExpenses(expensesTest, filterStartDate);
  expect(expenses.length)
    .toBe(1)
})

test('should sort by amount', () => {
  const filter = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
  const expenses = selectExpenses(expensesTest, filter);
  expect(expenses)
    .toEqual([
      expensesTest[1],
      expensesTest[0],
      expensesTest[2]
    ])
})