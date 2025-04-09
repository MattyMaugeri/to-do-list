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
    // Refresh content content
    console.log(project);

    const card = document.createElement('div');
    card.classList.add('card');
    const cardHeader = document.createElement('h3');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = project.title || project.textContent;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const cardInputs = document.createElement('input');
    cardInputs.classList.add('inputs');
    cardInputs.placeholder = 'New...';


    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('checkbox');


    cardContent.appendChild(checkBox);
    cardContent.appendChild(cardInputs);

    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    content.appendChild(card);
}

function viewAllProjects() {
    console.log('View all button clicked');
    content.textContent = '';

    Manager.myProjects.forEach(project => viewProjectTodos(project));
    
}

const projectDiv = document.querySelector('.my-projects');
const unorderedListDiv = document.createElement('ul');
unorderedListDiv.classList.add('my-projects-list');
projectDiv.appendChild(unorderedListDiv);
function renderProjects() {
    // Refresh the content
    unorderedListDiv.textContent = '';

    for (let i = 0; i < Manager.myProjects.length; i++) {
        const listItem = document.createElement('li');
        listItem.classList.add('project-list-item');
        listItem.id = Manager.myProjects[i].title.split(' ').join('').toLowerCase();
        listItem.textContent = Manager.myProjects[i].title;
        unorderedListDiv.appendChild(listItem);
    }
}



function bindEvents() {

    // listener to call method to display specific todos for the clicked on project
    unorderedListDiv.addEventListener('click', (e) => {
        content.textContent = '';
        viewProjectTodos(e.target);
    });



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