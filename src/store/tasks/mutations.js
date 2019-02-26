import {findIndex} from 'lodash'

export function setOnGoingTasks(state, tasks) {
  state.onGoingTasks = tasks;
}

export function setFinishedTasks(state, tasks) {
  state.finishedTasks = tasks;
}

export function setDeletedTasks(state, tasks) {
  state.deletedTasks = tasks;
}

export function appendToOnGoingTasks(state, task) {
  state.onGoingTasks.push(task);
}

export function appendToDeletedTasks(state, task) {
  state.deletedTasks.push(task);
}

export function appendToFinishedTasks(state, task) {
  state.finishedTasks.push(task);
}

export function removeFromOnGoingTasks(state, task) {
  findThenRemove(state.onGoingTasks, task)
}

export function removeFromDeletedTasks(state, task) {
  findThenRemove(state.deletedTasks, task)
}

export function removeFromFinishedTasks(state, task) {
  findThenRemove(state.finishedTasks, task)
}

function findThenRemove(array, task) {
  let index = findIndex(array, {
    id: task.id
  })
  
  if (index >= 0) {
    array.splice(index, 1)
  }
  console.log('array',array)
}
