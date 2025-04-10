import * as Manager from './manager';

const dialog = document.querySelector('#add-project-dialog');
const form = document.querySelector('#add-project-form');
const sidebarDiv = document.querySelectorAll('.sidebar');
const content = document.querySelector('.content');



const viewAllProjectsBtn = document.querySelector('#view-all-projects-btn');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelBtn = document.querySelector('#dialog-cancel-btn');



function addProjectDisplay() {
    dialog.showModal();
}

// This is where you would display the specific todos of that project in the content div
function viewProjectTodos(project) {

    console.log(project);
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = project.split(' ').join('').toLowerCase();

    const cardHeader = document.createElement('h3');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = project;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    // const addTodoBtn = document.createElement('button');
    // addTodoBtn.id = 'add-todo-btn';
    // addTodoBtn.textContent = 'Add New Task ...';
    // cardContent.appendChild(addTodoBtn);


    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    content.appendChild(card);
}

function viewAllProjects() {
    content.textContent = '';

    for (const project in Manager.tasks) {
        viewProjectTodos(project);
        
    }

}

const projectDiv = document.querySelector('.my-projects');
const unorderedListDiv = document.createElement('ul');

unorderedListDiv.classList.add('my-projects-list');
projectDiv.appendChild(unorderedListDiv);

function renderProjects() {
    // Refresh the content
    unorderedListDiv.textContent = '';

    for (const project in Manager.tasks) {
        const listItem = document.createElement('li');
        listItem.classList.add('project-list-item');
        listItem.id = project.split(' ').join('').toLowerCase();
        listItem.textContent = project;
        unorderedListDiv.appendChild(listItem);
    }
}

// A list of forms need to be created ?

const cardDiv = document.querySelector('.card');
const cardContentDiv = document.querySelector('.card-content');
function renderTodos() {


}



function bindEvents() {

    // listener to call method to display specific todos for the clicked on project
    unorderedListDiv.addEventListener('click', (e) => {
        content.textContent = '';
        viewProjectTodos(e.target.innerHTML);        
    });


    // Figuring out how to append form to card div without it breaking everything
    content.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'add-todo-btn') {
            console.log(target);
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



    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        Manager.addProject(title);
        renderProjects();
        form.reset();
        dialog.close();
    });

    cancelBtn.addEventListener('click', function () {
        console.log('Cancel Btn Clicked');
        dialog.close();
    });

}

// Remove render eventually

export { addProjectDisplay, bindEvents, renderProjects };