const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if ( taskText === "" ) return;

    tasks.push(taskText);
    saveTasks();
    renderTasks();
    taskInput.value = "";
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(( task, index ) => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        Object.assign(deleteBtn.style, {
            marginLeft: '10px',
            background: 'none',
            border: 'none'
        });

        deleteBtn.addEventListener('click', () => {
            tasks.splice( index, 1 );
            saveTasks();
            renderTasks();
        });
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}





renderTasks();