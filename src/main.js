import './styles.css';
import { Project } from './modules/project.js';
import { Todo } from './modules/todo.js';
import * as UI from './modules/userInterface.js';
import * as Manager from './modules/manager.js';



UI.bindEvents();
Manager.bindEvents();