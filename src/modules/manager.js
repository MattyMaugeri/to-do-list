import { Todo } from './todo.js';
import { renderTodos } from './userInterface.js';
import { tasks } from '../main.js';

function createProject(title) {
    tasks[title] = [];
    console.log(tasks);
}

function createTodo(description, dueDate, priority) {
    const normalisedPriority = normaliseTitle(priority);
    return new Todo(description, dueDate, normalisedPriority);
}

function removeTodo(todoID) {
    for (const project in tasks) {
        const index = tasks[project].findIndex(item => item.id === todoID);
        console.log('Index of todo to delete: ', index);

        if (index !== -1) {
            tasks[project].splice(index, 1);
            return true;
        }
    }
    return false;
}

function sortTodos(project) {
    const projectName = normaliseTitle(project.split('-').pop());

    const priorityOrder = ['Low', 'Medium', 'High'];
    console.log('Sorting project: ' + projectName);

    // Sorts the array in place
    tasks[projectName].sort((a, b) =>
        priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)
    );

    renderTodos(projectName);
}

function removeProject(projectName) {
    if (tasks[projectName] && projectName !== 'Personal') {
        delete tasks[projectName];
    } else {
        console.log('Cant delete this');
    }
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
        if (match) {
            // Ensure that the match is an instance of Todo
            if (!(match instanceof Todo)) {
                return Object.assign(new Todo(), match);
            }
            return match; // Already an instance of Todo
        }
    }
    return null;
}


function normaliseTitle(string) {
    return string
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function bindEvents() {

}

export { createProject, bindEvents, createTodo, normaliseTitle, removeTodo, findProjectName, findTodo, removeProject, sortTodos }