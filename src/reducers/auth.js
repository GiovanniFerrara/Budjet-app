export default (state = {}, action) => {
  switch (action.type) {

    case 'LOGIN':
      return {
        ...state,
        id: action.uid
      };

    case 'LOGOUT':
      return {};

    default:
      return state;
  }
}