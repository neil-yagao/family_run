import ApolloClient from '../boot/apollo-client'
import gql from "graphql-tag";

export default {
  mutateTask(taskId, task) {
    return ApolloClient.mutate({
      mutation: gql `
			mutation UpdateTask(
				$taskId: String!
				$task: TaskInput
			) {
				updateTask(taskId: $taskId, task: $task) {
					id
				}
			}
			`,
      variables: {
        taskId: taskId,
        task: {
          ...task
        }
      }
    })
  }
}
