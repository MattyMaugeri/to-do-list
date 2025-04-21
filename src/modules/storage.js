export function saveDataToLocalStorage(tasks) {
    console.log('Saving updated data to Local Storage');
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadDataFromLocalStorage();
}

export function loadDataFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');

    return storedTasks
        ? JSON.parse(storedTasks)
        : {
            'Personal': []
        };
}
