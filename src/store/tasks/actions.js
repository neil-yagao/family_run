import apolloClient from '../../boot/apollo-client';
import gql from "graphql-tag";
import {
  date
} from 'quasar'

export function deleteTask({
  commit
}, payload) {

  let operation = getOperation('deleted')
  return operatingTask(payload, operation).then(() => {
    commit('removeFromOnGoingTasks', payload)
    commit('appendToDeletedTasks', payload)
  });
}

export function delayTask({
  commit
}, payload) {
  let operation = getOperation('delay+' + payload.days)
  return operatingTask(payload.task, operation).then(() => {
    commit('removeFromOnGoingTasks', payload.task)
    commit('appendToOnGoingTasks', payload.task)
  })

}

export function completedTask({
  commit
}, payload) {

  let operation = getOperation('finished');
  return operatingTask(payload, operation).then(() => {
    commit('removeFromOnGoingTasks', payload)
    commit('appendToFinishedTasks', payload)
  })
}

export function reopenDeletedTask({commit},payload){
  let operation = getOperation('onGoing');
  return operatingTask(payload, operation).then(() => {
    commit('removeFromDeletedTasks', payload)
    commit('appendToOnGoingTasks', payload)
  })
}

export function addNewTask({
  commit
}, detail) {
  return new Promise(function (resolve, reject) {
    apolloClient.mutate({
      mutation: gql `
				mutation($task: TaskInput!) {
					addTask(task: $task) {
						id
					}
				}
			`,
      variables: {
        task: detail
      }
    }).then((res) => {
      let task = {
        ...res.data.addTask,
        ...detail,
        visible:1
      }
      commit('appendToOnGoingTasks', task);
      resolve(task)
    }).catch(reject)
  })

}

function operatingTask(task, operation) {
  return apolloClient.mutate({
    mutation: gql `
				mutation($taskId: String!,$operation:TaskOperationInput) {
					operateTask(taskId: $taskId,operation:$operation) {
						id
					}
				}
			`,
    variables: {
      taskId: task.id,
      operation: operation
    }
  });
}

function getOperation(operation) {
  return {
    operation: operation,
    operatingTimestamp: Date.now() + '',
    operatingDate: date.formatDate(Date.now(), 'YYYY-MM-DD'),
    operator: '-1'
  }
}
