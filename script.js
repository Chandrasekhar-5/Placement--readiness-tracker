const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if ( taskText === "" ) return;

    const listItem = document.createElement('li');
    listItem.innerText = taskText;
    taskList.appendChild(listItem);
    taskInput.value = "";
});