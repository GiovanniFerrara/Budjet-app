import React from 'react';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import renderWithAuth, { appRenderer } from './utils/renderWithAuth';

export const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const renderApp = appRenderer(app);

renderWithAuth(renderApp)

