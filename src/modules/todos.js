class Todo {
    constructor (title, desc, duDate, priority, completed) {
        this.title = title;
        this.desc = desc;
        this.duDate = duDate;
        this.priority = priority;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

}

export { Todo };