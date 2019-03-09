import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let hystory, addExpense, wrapper;

beforeEach(() => {
  hystory = {
    push: jest.fn(),
  }
  addExpense = jest.fn();
  wrapper = shallow(<AddExpensePage history={hystory} addExpense={addExpense} />)
})

test('should render AddExpensePage', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
  expect(hystory.push).toHaveBeenLastCalledWith('/')
  expect(addExpense).toHaveBeenLastCalledWith(expenses[0])
})