import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilter } from '../../../src/components/ExpenseListFilter';
import { filter } from '../fixtures/filters';
import moment from 'moment'

let wrapper, setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate;

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  wrapper = shallow(
    < ExpenseListFilter
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      filters={filter}
    />
  )
})
test('should render ExpenseListFilter component', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should set text change', () => {
  const textFilter = "name"
  wrapper.find("input").simulate('change', {
    target: {
      value: textFilter
    }
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(textFilter)
})

test('should sort by date', () => {
  const value = "date";
  wrapper.find('select').prop('onChange')({
    target: { value }
  })
  expect(sortByDate).toHaveBeenCalled()
})

test('should handle date changes', () => {
  const startDate = moment(0);
  const endDate = moment(0).add(3, 'days');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle calendar focus', () => {
  const calendarFocus = "startDate"
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocus)
  expect(wrapper.state('calendarFocus')).toBe(calendarFocus)
})