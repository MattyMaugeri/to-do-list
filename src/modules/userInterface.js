import * as Manager from './manager';

const dialog = document.querySelector('#add-project-dialog');
const projectForm = document.querySelector('#add-project-form');
const sidebarDiv = document.querySelectorAll('.sidebar');
const content = document.querySelector('.content');

const viewAllProjectsBtn = document.querySelector('#view-all-projects-btn');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelBtn = document.querySelector('#dialog-cancel-btn');

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
    // Won't need to split and join for this id
    addTodoBtn.id = `${project.split(' ').join('-').toLowerCase()}-btn`;
    addTodoBtn.textContent = 'Add New Task ...';

    const ul = document.createElement('ul');
    ul.classList.add('todo-list');
    sectionTwo.appendChild(ul);

    cardContent.appendChild(sectionOne);
    cardContent.appendChild(sectionTwo);
    sectionOne.appendChild(addTodoBtn);

    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    content.appendChild(card);
}

function viewProjectTodos(project) {  
    const currentProject = `#${project.split(' ').join('-').toLowerCase()}`;      
    const projectList = document.querySelector(currentProject);

    Manager.tasks[project].forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-list-item');
        li.textContent = todo.description;

        const dateSpan = document.createElement('span');
        dateSpan.textContent = todo.dueDate;

        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = todo.priority;

        li.appendChild(dateSpan);
        li.appendChild(prioritySpan);
        projectList.appendChild(li);
    });
}


function viewAllProjects() {
    // Clear content
    content.textContent = '';

    for (const project in Manager.tasks) {
        createCard(project);
        viewProjectTodos(project);
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

function bindEvents() {

    // listener to call method to display specific todos for the clicked on project
    unorderedListDiv.addEventListener('click', (e) => {
        const project = e.target.innerHTML;
        console.log(project);
        

        content.textContent = '';
        createCard(project);
        viewProjectTodos(project);
    });


    // Add Todo button
    content.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('add-todo-btn')) {
            displayTodoForm(target);
        }

        // Find the project in task => Manager.tasks[parent]

        // Display the form in that section

        // On form submit create a todo which will get added to that project 

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
        // May need to normalise this title value before adding to project
        const title = document.getElementById('title').value;        
        Manager.addProject(Manager.normaliseTitle(title));
        renderProjects();
        projectForm.reset();
        dialog.close();
    });

    cancelBtn.addEventListener('click', () => {
        console.log('Cancel Btn Clicked');
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
        const newTodo = Manager.addTodo(description, date, priority);
        console.log(newTodo);

        // Push this object into the correct Project Array   
        
        // Normalise project 
        Manager.tasks[project].push(newTodo);
        console.log(Manager.tasks[project]);

        document.querySelector('.section-one').appendChild(createButton());

        todoForm.classList.toggle('opened');


        // Render the todo's to update card display

        // Clear the form

        // Add the button back to the div






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