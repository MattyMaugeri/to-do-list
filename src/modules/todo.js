class Todo {
    constructor (description, dueDate, priority) {
        this.id = Date.now().toString() + Math.floor(Math.random() * 1000);
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.notes = '';
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

}

export { Todo };