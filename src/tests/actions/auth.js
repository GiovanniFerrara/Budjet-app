import { startLogin, startLogout, login, logout } from '../../actions/auth'
import user from '../fixtures/user';

test('should return a login action object', () => {
  expect(login(user)).toEqual({
    type: 'LOGIN',
    uid: user.uid
  })
})

test('should return a logout action object', () => {
  expect(logout()).toEqual({
    type: 'LOGOUT',

  })
})