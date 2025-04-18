import { handleTodoDialogSubmit, handleTodoDialogReset } from '../handlers/dialogs/todoDialogHandlers.js';
import { handleTodoFormSubmit, handleTodoFormReset } from '../handlers/forms/todoFormHandlers.js';
import { handleProjectFormSubmit, handleProjectFormReset } from '../handlers/forms/projectFormHandlers.js';
import { handleContentClick, handleSidebarClick } from '../handlers/content/contentClickHandlers.js';

import { tasks } from '../main.js';

const content = document.querySelector('.content');
const sidebar = document.querySelector('.sidebar');

const projectForm = document.querySelector('#project-form');
const projectDialog = document.querySelector('#project-dialog');

const todoDialog = document.querySelector('#todo-dialog');
const todoForm = document.getElementById('add-todo-form');


function addProjectDisplay() {
    document.body.classList.add('blur');
    projectDialog.showModal();
}

function createCard(project) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('h3');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = project;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.id = project.split(' ').join('-').toLowerCase();

    const sectionOne = document.createElement('div');
    sectionOne.classList.add('section-one');

    const sectionTwo = document.createElement('div');
    sectionTwo.classList.add('section-two');

    const addTodoBtn = createButton();
    addTodoBtn.id = `${project.split(' ').join('-').toLowerCase()}-btn`;

    const ul = document.createElement('ul');
    ul.classList.add('todo-list');

    const sortDiv = document.createElement('div');
    sortDiv.classList.add('sort-div');
    sortDiv.id = `sort-div-${project.split(' ').join('-').toLowerCase()}`;

    const sortBtn = document.createElement('button');
    sortBtn.classList.add('sort-btn');
    sortBtn.id = `sort-btn-${project.split(' ').join('-')}`;
    sortBtn.dataset.action = 'sort-todo';
    sortBtn.textContent = 'Sort by';

    const sortIcon = document.createElement('div');
    sortIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="20" height="20" fill="currentColor">
        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/>
    </svg>
    `;
    sortIcon.classList.add('sort-icon');
    sortIcon.id = `sort-icon-${project.split(' ').join('-').toLowerCase()}`

    sortDiv.appendChild(sortBtn);
    sortDiv.appendChild(sortIcon);
    sectionTwo.appendChild(sortDiv);

    sectionTwo.appendChild(ul);
    sectionOne.appendChild(addTodoBtn);
    cardContent.appendChild(sectionOne);
    cardContent.appendChild(sectionTwo);

    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    content.appendChild(card);
}

function createListItem(todo) {

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.dataset.action = 'check-todo';
    checkbox.dataset.todoId = todo.id;
    checkbox.type = 'checkbox';

    const todoDetailsDiv = document.createElement('div');
    todoDetailsDiv.classList.add('todo-details');
    todoDetailsDiv.id = `todo-${todo.id}`;
    todoDetailsDiv.dataset.action = 'edit-todo';
    todoDetailsDiv.dataset.todoId = todo.id;

    const li = document.createElement('li');
    li.classList.add('todo-list-item');
    todoDetailsDiv.textContent = todo.description;

    const dateSpan = document.createElement('span');
    dateSpan.textContent = todo.dueDate;

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = todo.priority;

    const btn = document.createElement('button');
    btn.classList.add('delete-todo-btn');
    btn.dataset.todoId = todo.id;
    btn.dataset.action = 'delete-todo';
    btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor"> 
        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
    `;

    li.prepend(todoDetailsDiv);
    li.prepend(checkbox);
    li.append(btn);
    todoDetailsDiv.appendChild(dateSpan);
    todoDetailsDiv.appendChild(prioritySpan);

    return li;
}

function renderTodos(project) {
    if (!project) {
        console.error('renderTodos: Invalid project name');
        return;
    }
    console.log('Rendering Todos');
    const projectID = `#${project.split(' ').join('-').toLowerCase()}`;
    const projectList = document.querySelector(`${projectID} > .section-two > .todo-list`);

    if (projectList != null) {
        projectList.textContent = '';
        tasks[project].forEach(todo => projectList.appendChild(createListItem(todo)));
    } else {
        return;
    }

}

function viewAllProjects() {
    // Clear content
    content.textContent = '';

    for (const project in tasks) {
        createCard(project);
        renderTodos(project);
    }
}

const projectDiv = document.querySelector('.my-projects');
const unorderedListDiv = document.createElement('ul');

unorderedListDiv.classList.add('my-projects-list');
projectDiv.appendChild(unorderedListDiv);

function renderProjects() {
    // Clear content
    unorderedListDiv.textContent = '';

    for (const project in tasks) {
        const listItem = document.createElement('li');
        listItem.id = project;
        listItem.classList.add('project-list-item');
        listItem.dataset.action = 'view-project';

        const projectNameDiv = document.createElement('div');
        projectNameDiv.classList.add('project-name');
        projectNameDiv.textContent = project;

        const btn = document.createElement('button');
        btn.classList.add('delete-project-btn');
        btn.id = project;
        btn.dataset.action = 'delete-project';
        btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor"> 
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
        </svg>
        `;

        listItem.appendChild(btn);
        listItem.appendChild(projectNameDiv);
        listItem.appendChild(btn);
        unorderedListDiv.appendChild(listItem);
    }
}


function displayTodoForm(target) {
    const sectionOne = target.parentElement;
    sectionOne.innerHTML = '';

    sectionOne.appendChild(todoForm);
    todoForm.classList.toggle('opened');
}

function createButton() {
    const btn = document.createElement('button');
    btn.classList.add('add-todo-btn');
    btn.dataset.action = 'add-todo';
    btn.textContent = 'Add New Task ...';

    return btn;
}

function viewTodoDetails(todo) {
    console.log(todo);
    const header = document.querySelector('.todo-display-header');
    header.textContent = todo.description;

    const date = document.getElementById('todo-display-date');
    date.value = todo.dueDate;

    const priority = document.getElementById('todo-display-priority');
    priority.value = todo.priority;

    const notes = document.getElementById('notes');
    notes.textContent = todo.notes;
}

function updateTodoDetails(todo) {
    console.log(todo);
    const date = document.getElementById('todo-display-date').value;
    const priority = document.getElementById('todo-display-priority').value;
    const notes = document.getElementById('notes').value;

    todo.dueDate = date;
    todo.priority = priority;
    todo.notes = notes;

    console.log(todo);
}


function toggleSidebarHighlight(target, className = 'clicked') {
    const allSidebarBtns = document.querySelectorAll('.sidebar-btn');
    const allProjects = document.querySelectorAll('.project-list-item');
    
    [...allSidebarBtns, ...allProjects].forEach(el => el.classList.remove(className));

    target.classList.add(className);
}


const todoCancelBtn = document.getElementById('todo-cancel-btn');

function bindEvents() {

    content.addEventListener('click', handleContentClick);
    sidebar.addEventListener('click', handleSidebarClick);

    todoDialog.addEventListener('reset', handleTodoDialogReset);
    todoDialog.addEventListener('submit', handleTodoDialogSubmit);

    todoForm.addEventListener('submit', handleTodoFormSubmit);

    // needs to be todoForm('reset'); fix logic to 
    todoCancelBtn.addEventListener('click', handleTodoFormReset);

    projectForm.addEventListener('submit', handleProjectFormSubmit);
    projectForm.addEventListener('reset', handleProjectFormReset)

}


export {
    addProjectDisplay, bindEvents, renderProjects, renderTodos, updateTodoDetails,
    createButton, viewTodoDetails, createCard, viewAllProjects, displayTodoForm, toggleSidebarHighlight
};