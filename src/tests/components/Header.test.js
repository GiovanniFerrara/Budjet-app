import React from 'react';
import { Header } from '../../components/Header';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";

let wrapper, logoutSpy;
beforeEach(() => {
  logoutSpy = jest.fn();
  wrapper = shallow(<Header logout={logoutSpy} />);
})

test('should render Header correctly', () => {
  expect(
    wrapper.find("h1").length
  ).toBe(1)

  expect(
    wrapper.find("h1").text()
  ).toBe("Expensify")
})

test('should call logout on button click', () => {

  wrapper.find('button').simulate('click')
  expect(logoutSpy).toHaveBeenCalled()
})