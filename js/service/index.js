export class Service{
    getTasksListAPI () {
        return axios({
            url: "https://62986710f2decf5bb7416a75.mockapi.io/ToDoList",
            method: "GET"
        })
    }

    addTaskAPI (task) {
        return axios({
            url: "https://62986710f2decf5bb7416a75.mockapi.io/ToDoList",
            method: "POST",
            data: task
        })
    }

    removeTaskAPI (id) {
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/ToDoList/${id}`,
            method: "DELETE",
        })
    }

    editTaskAPI (id, task) {
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/ToDoList/${id}`,
            method: "PUT",
            data: task
        })
    }

    getTaskAPI (id) {
        return axios({
            url: `https://62986710f2decf5bb7416a75.mockapi.io/ToDoList/${id}`,
            method: "GET",
        })
    }
}