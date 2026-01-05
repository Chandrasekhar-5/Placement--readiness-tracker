const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if ( taskText === "" ) return;

    tasks.push( {text: taskText, completed: false} );
    saveTasks();
    renderTasks();
    taskInput.value = "";
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(( task, index ) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });
        if (task.completed)  li.style.textDecration = 'line-through';

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
    updateProgress();
}

function updateProgress() {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressText.innerText = `Progress: ${percent}%`;
    progressFill.style.width = percent + "%";
}




renderTasks();