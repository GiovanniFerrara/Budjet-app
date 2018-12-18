import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configStore from './store/configureStore';
import {addExpense, editExpense, removeExpense} from './actions/expenses';
import {setTextFilter, setEndDate, setStartDate, sortByAmount, sortByDate} from './actions/filters';
import {getVisibleExpenses} from './selectors/expenses'
const store = configStore();

store.dispatch(addExpense({
    description: "Water",
    amount: 300
}))
store.dispatch(addExpense({
    description: "Gatto",
    amount: 100
}))
store.dispatch(addExpense({
    description: "Cane",
    amount: 900
}))

store.dispatch(sortByAmount())
/*
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
  });
*/
console.log(store.getState())
ReactDOM.render(<AppRouter />, document.getElementById('app'));
