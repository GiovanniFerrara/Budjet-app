import { LoginPage } from '../../components/LoginPage'
import { shallow } from 'enzyme';
import React from 'react';

test('should render the login page', () => {
  const wrapper = shallow(<LoginPage />)
  expect(wrapper).toMatchSnapshot()
})


test('should call login on button click', () => {
  const loginSpy = jest.fn();
  const wrapper = shallow(<LoginPage login={loginSpy} />)
  wrapper.find('button').simulate('click')
  expect(loginSpy).toHaveBeenCalled()
})