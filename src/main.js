import './styles.css';
import * as UI from './modules/userInterface.js';
import * as Manager from './modules/manager.js';

UI.renderProjects();

UI.bindEvents();
Manager.bindEvents();