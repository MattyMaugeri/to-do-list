import { Project } from './project.js';
import { Todo } from './todo.js';

const myProjects = [];

const tasks = {
    'Project One': [
        {
            description: 'Clean something',
            duDate: '12/05/2025',
            priority: 'Low',
            completed: false
        },
    ],
    'Project Two': [
        {
            description: 'Eat more',
            duDate: '69/69/6999',
            priority: 'High',
            completed: false
        },
    ],
}




function addProject(title) {
    tasks[title] = {};
}

function addTodo(description, duDate, priority) {
    const todo = new Todo(description, duDate, priority);
    // console.log(todo);

}



function bindEvents() {

}

export { addProject, bindEvents, myProjects, addTodo, tasks }