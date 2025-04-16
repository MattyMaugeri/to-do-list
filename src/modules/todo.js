class Todo {
    static todoID = 0;

    constructor (description, dueDate, priority) {
        this.id = Todo.todoID++;
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