import * as Manager from './manager.js';
import { Todo } from './todo.js';

const dialog = document.querySelector('#add-project-dialog');
const projectForm = document.querySelector('#add-project-form');
const sidebarDiv = document.querySelectorAll('.sidebar');
const content = document.querySelector('.content');

const viewAllProjectsBtn = document.querySelector('#view-all-projects-btn');
const addProjectBtn = document.querySelector('#add-project-btn');

function addProjectDisplay() {
    dialog.showModal();
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

    const addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('add-todo-btn');
    addTodoBtn.id = `${project.split(' ').join('-').toLowerCase()}-btn`;
    addTodoBtn.textContent = 'Add New Task ...';

    const ul = document.createElement('ul');
    ul.classList.add('todo-list');
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
    checkbox.id = todo.id;
    checkbox.type = 'checkbox';    

    const todoDetailsDiv = document.createElement('div');
    todoDetailsDiv.classList.add('todo-details');

    const li = document.createElement('li');
    li.classList.add('todo-list-item');
    todoDetailsDiv.textContent = todo.description;

    const dateSpan = document.createElement('span');
    dateSpan.textContent = todo.dueDate;

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = todo.priority;

    const btn = document.createElement('button');
    btn.classList.add('delete-todo-btn');
    btn.id = todo.id;
    btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor"> 
        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
    `;

    li.prepend(todoDetailsDiv);
    li.prepend(checkbox);
    todoDetailsDiv.appendChild(dateSpan);
    todoDetailsDiv.appendChild(prioritySpan);
    todoDetailsDiv.appendChild(btn);

    return li;
}

function renderTodos(project) {
    const projectID = `#${project.split(' ').join('-').toLowerCase()}`;
    const projectList = document.querySelector(`${projectID} > .section-two > .todo-list`);
    projectList.textContent = '';

    Manager.tasks[project].forEach(todo => projectList.appendChild(createListItem(todo)));
}

function viewAllProjects() {
    // Clear content
    content.textContent = '';

    for (const project in Manager.tasks) {
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

    for (const project in Manager.tasks) {
        const listItem = document.createElement('li');
        listItem.classList.add('project-list-item');
        listItem.textContent = project;
        unorderedListDiv.appendChild(listItem);
    }
}

const todoForm = document.getElementById('add-todo-form');

function displayTodoForm(target) {
    const sectionOne = target.parentElement;
    sectionOne.innerHTML = '';

    sectionOne.appendChild(todoForm);
    todoForm.classList.toggle('opened');
}

function createButton() {
    const btn = document.createElement('button');
    btn.classList.add('add-todo-btn');
    btn.textContent = 'Add New Task ...';

    return btn;
}

const todoCancelBtn = document.getElementById('todo-cancel-btn');
const checkbox = document.querySelector('.checkbox');
console.log(checkbox);


function bindEvents() {

    // listener to call method to display specific todos for the clicked on project
    unorderedListDiv.addEventListener('click', (e) => {
        const project = e.target.innerHTML;
        if (e.target.tagName === 'LI') {
            content.textContent = '';

            createCard(project);
            renderTodos(project);
        } else {
            return;
        }
    });

    // Add Todo button
    content.addEventListener('click', (e) => {
        const target = e.target;
        // console.log(target);

        if (target != null) {
            const deleteBtn = target.closest('button');

            if (target.classList.contains('add-todo-btn')) {
                displayTodoForm(target);
            } else if (target.id === 'todo-cancel-btn') {
                dialog.close();
            } else if (target.id === 'todo-submit-btn') {
                return;
            } else if (deleteBtn != null) {
                const deleteBtnID = deleteBtn.id;
                const project = Manager.findProjectName(deleteBtnID);

                Manager.removeTodo(deleteBtnID);
                console.log(Manager.tasks[project]);

                renderTodos(project);
            } else if (target.classList.contains('checkbox')) {
                const currentTodo = Manager.findTodo(target.id);                
                currentTodo.toggleComplete();
                console.log(currentTodo);
            }
        } else {
            return;
        }

    })

    viewAllProjectsBtn.addEventListener('click', viewAllProjects);

    addProjectBtn.addEventListener('click', addProjectDisplay);

    sidebarDiv.forEach((element) => {
        let children = Array.from(element.children);

        const buttons = children.filter((child) =>
            child.tagName === 'BUTTON'
        );

        buttons.forEach(btn => btn.addEventListener('click', () => {
            // Remove classlist from all buttons first
            buttons.forEach(button => button.classList.remove('clicked'));

            // Toggle CSS class
            btn.classList.toggle('clicked');
        }));
    });



    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;

        Manager.createProject(Manager.normaliseTitle(title));
        renderProjects();
        projectForm.reset();
        dialog.close();
    });


    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const project = Manager.normaliseTitle(e.target.parentElement.parentElement.id);

        // grab the details submitted through the form
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority-select').value;

        // New Todo object created
        const newTodo = Manager.createTodo(description, date, priority);
        console.log(newTodo);
        
          
        // Push this object into the correct Project Array   
        Manager.tasks[project].push(newTodo);

        document.querySelector('.section-one').appendChild(createButton());

        todoForm.classList.toggle('opened');

        const projectID = `#${project.split(' ').join('-').toLowerCase()}`;
        const projectList = document.querySelector(`${projectID} > .section-two > .todo-list`);

        // Clear content
        projectList.textContent = '';

        // Render the todo's to update card display
        renderTodos(project);
    })

    todoCancelBtn.addEventListener('click', (e) => {
        const parent = e.target.parentElement.parentElement;
        parent.textContent = '';

        console.log(parent);
        parent.appendChild(createButton());

        todoForm.classList.toggle('opened');

    })

}

// Remove render eventually

export { addProjectDisplay, bindEvents, renderProjects };