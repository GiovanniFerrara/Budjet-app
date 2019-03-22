import moment from 'moment';

export const filter = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
}
export const filterAlt = {
  text: "",
  sortBy: "date",
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
}