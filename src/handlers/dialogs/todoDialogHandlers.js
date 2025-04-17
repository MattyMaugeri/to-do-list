import * as Manager from '../../modules/manager';
import { updateTodoDetails, renderTodos } from '../../modules/userInterface'

const todoDialog = document.querySelector('#todo-dialog');


function handleTodoDialogSubmit(event) {
    event.preventDefault();
    // Grab Todo ID through dataset attribute 
    const todoId = todoDialog.dataset.todoId;
    const currentTodo = Manager.findTodo(todoId);
    const project = Manager.findProjectName(todoId);

    updateTodoDetails(currentTodo);
    renderTodos(project);

    todoDialog.close();
    document.body.classList.remove('blur');
}

function handleTodoDialogReset(event) {
    console.log(event.target);
    todoDialog.close();
    document.body.classList.remove('blur');
}

export { handleTodoDialogSubmit, handleTodoDialogReset}