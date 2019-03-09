import React, { Component } from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';
test("ExpenseForm without data should render correcly the snapshop", () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot();
})

test("ExpenseForm with data should render correcly the snapshop", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
  expect(wrapper).toMatchSnapshot();
})

test("ExpenseForm should return an error for invalid submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("form").simulate('submit', {
    preventDefault: function () { }
  })
  expect(wrapper.state("error").length).toBeGreaterThan(0)
})

test("ExpenseForm should change the state on input change", () => {
  const description = "New description"
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('input').at(0).simulate("change", {
    target: {
      value: description,
      name: "description"
    }
  })
  expect(wrapper.state('description')).toBe(description)
})


test("ExpenseForm should set note on text area change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const description = "New text"
  wrapper.find('textarea').simulate('change', {
    target: {
      value: description,
      name: "note"
    }
  })
  expect(wrapper.state("note")).toBe(description)
})

test("should submit form with the correct data", () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(< ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.state('error')).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
})

test('should set date onDateChange', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  // const OnDateChangeSpy = jest.fn();
  const now = moment()
  wrapper.find("SingleDatePicker").prop('onDateChange')(now)
  expect(wrapper.state("createdAt")).toEqual(now)
})

test('should calendar focus onFocusChange', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  // const OnDateChangeSpy = jest.fn();
  wrapper.find("SingleDatePicker").prop('onFocusChange')({ focused: true })
  expect(wrapper.state("calendarFocus")).toEqual(true)
})