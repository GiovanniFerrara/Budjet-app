import { history } from '../routers/AppRouter';
import { firebase } from '../firebase/firebase'
import { startFetchExpenses } from '../actions/expenses';
import { store } from '../app';
import ReactDOM from 'react-dom';
import React from 'react'
import { login, logout } from '../actions/auth'


export default (renderApp) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch(login(user))
      store.dispatch(startFetchExpenses())
        .then(() => {
          renderApp(user);
          redirect('/dashboard')
        })
    } else {
      store.dispatch(logout())
      renderApp();
      redirect('/')
    }
  })
}

export function appRenderer(jsx) {
  let isRendered = false;
  return (user) => {
    renderLoadingOrData(jsx)
    isRendered = true;
    return isRendered;
  }
}


export function renderLoadingOrData(jsx) {
  if (jsx) {
    ReactDOM.render(jsx, document.getElementById('app'));
  } else {
    ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));
  }
}

const redirect = (location) => {
  history.push(location)
}
