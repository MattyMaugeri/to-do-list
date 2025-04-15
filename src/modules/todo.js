class Todo {
    static currentID = 0;

    constructor (description, dueDate, priority) {
        this.id = Todo.currentID++;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

}

export { Todo };