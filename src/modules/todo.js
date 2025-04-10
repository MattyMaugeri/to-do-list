class Todo {
    constructor (description, duDate, priority, completed) {
        this.description = description;
        this.duDate = duDate;
        this.priority = priority;
        completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

}

export { Todo };