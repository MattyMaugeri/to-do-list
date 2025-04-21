import { createTodo } from "./manager";

export function saveDataToLocalStorage(tasks) {
    console.log('Saving updated data to Local Storage');
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadDataFromLocalStorage();
}

export function loadDataFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    let tasks = {};

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);   

        for (const project in tasks) {
            tasks[project] = tasks[project].map(todo => {
                const t = createTodo(todo.description, todo.dueDate, todo.priority);

                t.id = todo.id;
                t.completed = todo.completed;
                t.notes = todo.notes;
                
                return t;
                
            })
        }
        return tasks;
    } else {
        return tasks = {
            'Personal': [],
        }
    }
}
