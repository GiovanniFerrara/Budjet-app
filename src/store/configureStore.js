import {createStore, combineReducers} from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

export default ()=>{
    const store = createStore(combineReducers({
        expenses: expensesReducer,
        filter: filtersReducer
    }))
    return store
}