import filterReducer from '../../reducers/filters';
import moment from 'moment';
import {setTextFilter, sortByAmount, sortByDate, setEndDate,setStartDate} from '../../actions/filters';


test("should setup default values",()=>{
  const result = filterReducer(undefined,"@@INIT");
  expect(result)
    .toEqual({
      text: "",
      sortBy:"date",
      startDate: moment().startOf("month"),
      endDate: moment().endOf("month")
    })
})

test("should setup text filter values",()=>{
  const state = {
    text: "",
    sortBy:"amount",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  }
  const result = filterReducer(state,setTextFilter("sometext"));
  expect(result)
    .toEqual({
      ...state,
      text: "sometext"
    })
})

test('should sort by amount',()=>{
  const state = {
    text: "",
    sortBy:"",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  }
  const result = filterReducer(state,sortByAmount());
  expect(result)
    .toEqual({
      ...state,
      sortBy: "amount"
    })
})

test('should set start date',()=>{
  const state = {
    text: "",
    sortBy:"",
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  }
  const date =  moment().endOf('month').add(1,"month")
  const result = filterReducer(state,setStartDate(date));
  expect(result.startDate)
    .toBe(date)
})