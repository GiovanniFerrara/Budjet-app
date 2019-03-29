import authReducer from '../../reducers/auth';
import { login, logout } from '../../actions/auth';
import user from '../fixtures/user';

test('should authReducer return updated state when login', () => {
  const expectedState = authReducer({}, login(user))
  expect(expectedState).toEqual({
    id: user.uid
  })
})

test('should authReducer return updated state when logout', () => {
  const initialState = {
    id: user.uid
  }
  const expectedState = authReducer(initialState, logout)
  expect(expectedState).toEqual({})
})