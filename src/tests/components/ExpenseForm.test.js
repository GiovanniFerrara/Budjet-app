import React, { Component } from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test("ExpenseForm without data should render correcly the snapshop", () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot();
})

test("ExpenseForm with data should render correcly the snapshop", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
  expect(wrapper).toMatchSnapshot();
})