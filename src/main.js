import './styles.css';
import { Project } from './modules/project.js';
import { Todo } from './modules/todos.js';
import * as UI from './modules/userInterface.js';

const content = document.querySelector('.content');
const myProjects = [];


// This should all be seperated into their modules
const projectOne = new Project('Project 1');
myProjects.push(projectOne);

const projectTwo = new Project('Project 2');
myProjects.push(projectTwo);

const projectThree = new Project('Project 3');
myProjects.push(projectThree);

console.log(myProjects);

const projectDiv = document.querySelector('.project-list');
const unorderedListDiv = document.createElement('ul');
projectDiv.appendChild(unorderedListDiv);
for (let i=0; i<myProjects.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = myProjects[i].title;
    unorderedListDiv.appendChild(listItem);
}





const todo = new Todo('Clean', 'Cleaning', '10/05/2025', 'Low', false);
console.log(todo);

