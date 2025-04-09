import './styles.css';
import { Project } from './modules/project.js';
import { Todo } from './modules/todo.js';
import * as UI from './modules/userInterface.js';
import * as Manager from './modules/manager.js';



UI.bindEvents();
Manager.bindEvents();

// Eventually get rid of these calls below
Manager.addProject('Sample one');
UI.renderProjects();

const todo = new Todo('Title', 'Description', '12/05/2025', 'Low', false);
