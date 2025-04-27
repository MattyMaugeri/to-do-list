import { Todo } from './todo.js';
import { renderTodos } from './userInterface.js';
import { tasks } from '../main.js';

function createProject(title) {
    tasks[title] = [];
    console.log(tasks);
}

function removeProject(projectName) {
    if (tasks[projectName] && projectName !== 'Personal') {
        delete tasks[projectName];
    } else {
        console.error('Cant delete this');
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

function findTodo(id) {
    for (const project in tasks) {
        let todos = tasks[project];
        const match = todos.find((elem) => elem.id === id);
        if (match) {
            return match;
        }
    }
    console.error('No match found with provided ID: ', id);
    return null;
}

function sortTodos(project) {
    const projectName = extractProjectNameFromID(project);    

    const priorityOrder = ['Low', 'Medium', 'High'];
    console.log('Sorting project: ' + projectName);

    tasks[projectName].sort((a, b) =>
        priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)
    );

    renderTodos(projectName);
}


function normaliseTitle(string) {
    // project-example -> Project
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function normaliseTitle2(string) {
    // project-example -> Project
    return string
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function extractProjectNameFromID(str) {
    return str
    .split('-')
    .splice(2)
    .join(' ');
}

export { createProject, createTodo, normaliseTitle, removeTodo, findProjectName, findTodo, removeProject, sortTodos, normaliseTitle2 }