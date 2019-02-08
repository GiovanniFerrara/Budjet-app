import {setTextFilter, sortByAmount, sortByDate, setEndDate,setStartDate} from '../../actions/filters';
import moment from 'moment';

test("should generate action to set the text filter",()=>{
  const action = setTextFilter ("filter");
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: "filter"
  })
})

test("should generate action to sort by date",()=>{
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  })
})

test("should generate action to sort by amount",()=>{
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT',
  })
})

test("should generate action to set start date",()=>{
  const date = moment().add(3, 'days');
  const action = setStartDate(date);
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: date
  })
})

test("should generate action to set end date",()=>{
  const date = moment().add(5, 'days');
  const action = setEndDate(date);
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: date
  })
})