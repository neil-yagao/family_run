import moment from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD';
const today = moment().format(TIME_FORMAT);
const endOfThisWeek = moment().endOf('week').format(TIME_FORMAT);
const endOfThisMonth = moment().endOf('month').format(TIME_FORMAT);

export function taskForDay(state) {
  return state.onGoingTasks.filter(t => {
    return t.dueDate === today && t.visible == '1';
  })
}

export function taskForWeek(state) {
  return state.onGoingTasks.filter(t => {
    return t.dueDate <= endOfThisWeek && t.dueDate > today && t.visible == '1';
  })
}

export function taskForMonth(state) {
  return state.onGoingTasks.filter(t => {
    return t.dueDate <= endOfThisMonth && t.dueDate > endOfThisWeek && t.visible == '1';
  })
}
