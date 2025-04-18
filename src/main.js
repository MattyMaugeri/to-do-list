import './styles.css';
import * as UI from './modules/userInterface.js';
import * as Manager from './modules/manager.js';
import { Todo } from './modules/todo.js';


const tasks = {
    'Personal': [
        new Todo('Clean Room', '1999-09-09', 'Low'),
        new Todo('Wash Something', '1999-09-09', 'High'),
    ]
}

UI.renderProjects();

UI.bindEvents();
Manager.bindEvents();

console.log(tasks);


export { tasks }