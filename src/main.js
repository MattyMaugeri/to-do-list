import './styles.css';
import * as UI from './modules/userInterface.js';
import { loadDataFromLocalStorage } from './modules/storage.js';

const tasks = loadDataFromLocalStorage();

UI.renderProjects();

UI.bindEvents();

export { tasks }