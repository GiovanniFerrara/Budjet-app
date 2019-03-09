import React from 'react';
import { shallow } from 'enzyme';
import { editExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let wrapper
beforeEach(() => {
  wrapper = shallow(<editExpensePage expense={expenses[1]} />)
})

test('should editExpensePage match snapshot', () => {

})