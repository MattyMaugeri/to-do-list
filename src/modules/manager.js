import { Project } from './project.js';
import { Todo } from './todo.js';

const tasks = {
    'Project One': [
        {
            id: 0,
            description: 'Clean something',
            dueDate: '12/05/2025',
            priority: 'Low',
            completed: false
        },
    ],
    'Project Two': [
        {
            id: 1,
            description: 'Eat more',
            dueDate: '69/69/6999',
            priority: 'High',
            completed: false
        },
    ],
}

function addProject(title) {
    tasks[title] = [
        {
            description: '',
            dueDate: '',
            priority: '',
            completed: false,
        }
    ]
}

function addTodo(description, dueDate, priority) {
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


function normaliseTitle(string) {
    return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function bindEvents() {

}

export { addProject, bindEvents, addTodo, tasks, normaliseTitle, removeTodo, findProjectName }