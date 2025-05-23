import * as Manager from '../../modules/manager';
import { createButton, renderTodos } from '../../modules/userInterface';
import { tasks } from '../../main';
import { saveDataToLocalStorage } from '../../modules/storage.js';

const todoForm = document.getElementById('add-todo-form');

function handleTodoFormSubmit(event) {
    event.preventDefault();
    const project = Manager.normaliseTitle2(event.target.parentElement.parentElement.id);
    console.log('Project Name: ', project);
    console.log('Tasks Object: ', tasks);
    
    

    // grab the details submitted through the form
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority-select').value;

    // New Todo object created
    const newTodo = Manager.createTodo(description, date, priority);
    console.log(newTodo);

    // Push this object into the correct Project Array   
    tasks[project].push(newTodo);

    document.querySelector('.section-one').appendChild(createButton());

    todoForm.classList.toggle('opened');

    const projectID = `#${project.split(' ').join('-').toLowerCase()}`;
    const projectList = document.querySelector(`${projectID} > .section-two > .todo-list`);

    // Clear content
    projectList.textContent = '';
    
    saveDataToLocalStorage(tasks);  // Save to LS

    // Render the todo's to update card display
    renderTodos(project);

}

function handleTodoFormReset(event) {

    const parent = event.target.parentElement;

    parent.textContent = '';
    parent.appendChild(createButton());
    todoForm.classList.toggle('opened');
}


export { handleTodoFormSubmit, handleTodoFormReset }