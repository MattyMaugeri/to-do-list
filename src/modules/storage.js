export function saveDataToLocalStorage(tasks) {
    console.log('Saving updated data to Local Storage');
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadDataFromLocalStorage();
}

export function loadDataFromLocalStorage() {    
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log('Loading Tasks from Local Storage', storedTasks);

    if (storedTasks) {
        return storedTasks;
    } else {
        console.error('No stored tasks, please create new Projects and Todos');
        return storedTasks = {};
    }
}