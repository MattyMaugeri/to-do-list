import * as Manager from './manager';

const dialog = document.querySelector('#add-project-dialog');
const form = document.querySelector('#add-project-form');

const viewAllProjectsBtn = document.querySelector('#view-all-projects-btn');
const addProjectBtn = document.querySelector('#add-project-btn');
const cancelBtn = document.querySelector('#dialog-cancel-btn');


function addProjectDisplay() {
    dialog.showModal();
}

function viewProjectTodos(project) {
    // This is where you would display the specific todos of that project in the content div
    console.log(project);
    
}

const projectDiv = document.querySelector('.my-projects');
const unorderedListDiv = document.createElement('ul');
unorderedListDiv.classList.add('projects-list');
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

const projectItem = document.querySelector('.project-list-item');
console.log(projectItem);


function bindEvents() {

    viewAllProjectsBtn.addEventListener('click', function () {
        console.log('View all projects btn clicked');

    });

    addProjectBtn.addEventListener('click', addProjectDisplay);

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

    // listener to call method to display specific todos for the clicked on project
    unorderedListDiv.addEventListener('click', (e) => viewProjectTodos(e.target));

}

export { addProjectDisplay, bindEvents };