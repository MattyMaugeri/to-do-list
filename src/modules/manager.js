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
    // Converts 'sort-btn-My-Project' --> 'My Project'
    const projectName = extractProjectNameForSorting(project); 

    const priorityOrder = ['Low', 'Medium', 'High'];

    tasks[projectName].sort((a, b) =>
        priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)
    );

    renderTodos(projectName);
}

// Definitely need to work on my naming/ID system as the 3 below functions are bad

function normaliseTitle(string) {
    // Converts 'project example' -> 'Project Example'
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function normaliseTitle2(string) {
    // Converts 'project-example' -> 'Project Example'
    return string
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function extractProjectNameForSorting(str) {
    return str
    .split('-')
    .splice(2)
    .join(' ');
}

export { createProject, createTodo, normaliseTitle, removeTodo, findProjectName, findTodo, removeProject, sortTodos, normaliseTitle2 }