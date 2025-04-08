import { Project } from './project.js';
import { Todo } from './todo.js';

const myProjects = [];


function addProject(title) {
    const project = new Project(title);
    myProjects.push(project);
    return project;
}


function bindEvents() {
    console.log(myProjects);
    
}

export { addProject, bindEvents, myProjects }