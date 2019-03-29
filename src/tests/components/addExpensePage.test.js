import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let hystory, startAddExpense, wrapper;

beforeEach(() => {
  hystory = {
    push: jest.fn(),
  }
  startAddExpense = jest.fn();
  wrapper = shallow(<AddExpensePage history={hystory} startAddExpense={startAddExpense} />)
})

test('should render AddExpensePage', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
  expect(hystory.push).toHaveBeenLastCalledWith('/dashboard')
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0])
})