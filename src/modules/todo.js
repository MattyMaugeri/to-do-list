class Todo {
    static currentID = 0;

    constructor (description, dueDate, priority, completed) {
        this.id = Todo.currentID++;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

}

export { Todo };