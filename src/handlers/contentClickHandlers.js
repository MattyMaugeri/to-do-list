import * as Manager from '../modules/manager.js';
import {
    displayTodoForm, renderTodos, viewTodoDetails,
    createCard, viewAllProjects, addProjectDisplay, renderProjects, toggleSidebarHighlight, toggleCheckedTodo
}
    from '../modules/userInterface';

import { tasks } from '../main.js';
import { Todo } from '../modules/todo.js';
import { saveDataToLocalStorage } from '../modules/storage.js';

const content = document.querySelector('.content');
const todoDialog = document.querySelector('#todo-dialog');

function handleContentClick(event) {
    const target = event.target;
    const closestBtn = target.closest("[data-action]");

    if (!closestBtn) return null;

    const action = closestBtn.dataset.action;
    const todoID = closestBtn.dataset.todoId;
    const currentTodo = Manager.findTodo(todoID);
    const currentProject = Manager.findProjectName(todoID);

    switch (action) {
        case 'add-todo':
            displayTodoForm(target);
            break;
        case 'delete-todo':
            Manager.removeTodo(todoID);
            console.log(tasks[currentProject]);
            saveDataToLocalStorage(tasks);  // Save to LS
            renderTodos(currentProject);
            break;
        case 'sort-todo':
            console.log('sorting!');
            Manager.sortTodos(closestBtn.id);
            saveDataToLocalStorage(tasks);  // Save to LS
            break;
        case 'check-todo':
            console.log('Checking Todo: ', currentTodo);
            if (currentTodo instanceof Todo) {
                currentTodo.toggleComplete();

                // Logic to apply CSS styling on checked todo goes below here
                toggleCheckedTodo(currentTodo);

                saveDataToLocalStorage(tasks);  // Save to LS
            } else {
                console.error('currentTodo is not a Todo instance:', currentTodo);
            }
            break;
        case 'edit-todo':
            console.log('Editing Todo: ', currentTodo);
            viewTodoDetails(currentTodo);
            document.body.classList.add('blur');
            todoDialog.showModal();
            // Add id to dialog dataset
            todoDialog.dataset.todoId = currentTodo.id;
            saveDataToLocalStorage(tasks);  // Save to LS
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
            console.log('Project ID: ', Manager.normaliseTitle(project));
            
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
            saveDataToLocalStorage(tasks);  // Save to LS
            renderProjects();
        default:
            break;
    }

}


export { handleContentClick, handleSidebarClick }