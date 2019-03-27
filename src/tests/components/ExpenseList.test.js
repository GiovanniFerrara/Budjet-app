import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList'
import expenses from '../fixtures/expenses';

let fetchExpenses;
beforeEach(() => {
  fetchExpenses = jest.fn()
})

test('it should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />);
  expect(wrapper).toMatchSnapshot();
})


test('it should render ExpenseList without expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} fetchExpenses={fetchExpenses} />)
  expect(wrapper).toMatchSnapshot()
})