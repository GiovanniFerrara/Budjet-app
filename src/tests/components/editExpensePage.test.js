import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, editExpense, removeExpense, history;
beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(
    <EditExpensePage
      expense={expenses[1]}
      history={history}
      editExpense={editExpense}
      removeExpense={removeExpense}
    />
  )
})

test('should EditExpensePage match snapshot', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle editExpenses', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
  expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1])
})

test('should handle removeExpenses', () => {
  wrapper.find('button').simulate('click')
  expect(removeExpense).toHaveBeenCalledWith({ id: expenses[1].id })
  expect(history.push).toHaveBeenCalledWith('/dashboard')
})