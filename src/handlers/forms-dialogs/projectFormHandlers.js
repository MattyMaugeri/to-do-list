import * as Manager from '../../modules/manager';
import { renderProjects } from '../../modules/userInterface';

const projectDialog = document.querySelector('#project-dialog');
const projectForm = document.querySelector('#project-form');


function handleProjectFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;

    Manager.createProject(Manager.normaliseTitle(title));
    renderProjects();
    projectForm.reset();
    document.body.classList.remove('blur');
    projectDialog.close();
}

function handleProjectFormReset() {
    document.body.classList.remove('blur');
    projectDialog.close();
}

export { handleProjectFormSubmit, handleProjectFormReset }