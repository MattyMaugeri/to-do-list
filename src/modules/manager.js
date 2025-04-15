import { Todo } from './todo.js';

const tasks = {
    'Personal': [
        new Todo('Clean Room', '19/04/2025', 'High'),
    ]
}

function createProject(title) {
    tasks[title] = []
}

function createTodo(description, dueDate, priority) {
    return new Todo(description, dueDate, priority);
}

function removeTodo(todoID) {
    for (const project in tasks) {
        const index = tasks[project].findIndex(item => item.id == todoID);
        console.log(index);

        if (index !== -1) {
            tasks[project].splice(index, 1);
            return true;
        }
    }
    return false;

}

function findProjectName(id) {
    for (const project in tasks) {
        let todos = tasks[project];
        for (const property of todos) {
            if (property.id == id) {
                return project;
            }
        }
    }
    return null;
}

function findTodo(id) {
    for (const project in tasks) {
        let todos = tasks[project];
        const match = todos.find((elem) => elem.id == id);
        if (match) return match;
    }
    return 'No todo';
}


function normaliseTitle(string) {
    return string
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function bindEvents() {

}

export { createProject, bindEvents, createTodo, tasks, normaliseTitle, removeTodo, findProjectName, findTodo }