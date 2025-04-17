import * as Manager from '../../modules/manager';
import {
    displayTodoForm, renderTodos, viewTodoDetails,
    createCard, viewAllProjects, addProjectDisplay, renderProjects, toggleSidebarHighlight
}
    from '../../modules/userInterface'

const content = document.querySelector('.content');
const todoDialog = document.querySelector('#todo-dialog');

function handleContentClick(event) {
    const target = event.target;
    const closestBtn = target.closest("[data-action]");

    if (!closestBtn) return null;

    const action = closestBtn.dataset.action;
    const todoID = target.id.split('-').pop();
    const currentTodo = Manager.findTodo(todoID);
    const project = Manager.findProjectName(todoID);    

    switch (action) {
        case 'add-todo':
            displayTodoForm(target);
            break;
        case 'delete-todo':
            const deleteBtnId = closestBtn.id.split('-').pop();
            Manager.removeTodo(deleteBtnId);
            console.log(Manager.tasks[project]);
            renderTodos(project);
            break;
        case 'sort-todo':
            console.log('sorting!');
            Manager.sortTodos(closestBtn.id);
            break;
        case 'check-todo':
            currentTodo.toggleComplete();
            console.log(currentTodo);
            break;
        case 'edit-todo':
            viewTodoDetails(currentTodo);
            document.body.classList.add('blur');
            todoDialog.showModal();

            // Add id to dialog dataset
            todoDialog.dataset.todoId = currentTodo.id;
            break;
        default:
            break;
    }
}

function handleSidebarClick(event) {
    const target = event.target.closest("[data-action]");

    if (!target) return null;
    const action = target.dataset.action;

    switch (action) {
        case 'view-project':
            content.textContent = '';
            const project = target.id;
            toggleSidebarHighlight(target);
            createCard(project);
            renderTodos(project);
            break;
        case 'view-all-projects':
            toggleSidebarHighlight(target);
            viewAllProjects();
            break;
        case 'add-project':
            addProjectDisplay();
            break;
        case 'delete-project':
            console.log(target);
            const projectName = target.id;
            Manager.removeProject(projectName);
            renderProjects();
        default:
            break;
    }

}


export { handleContentClick, handleSidebarClick }