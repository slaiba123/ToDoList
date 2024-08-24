let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let done_tasks_array = JSON.parse(localStorage.getItem('doneTasks')) || [];

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('doneTasks', JSON.stringify(done_tasks_array));
}

function add_task() {
    const inputElement = document.getElementById('add-task');
    const new_task = inputElement.value.trim(); 
    if (new_task !== '') {
        tasks.push(new_task);
        inputElement.value = ''; 
        renderTasks(tasks); 
        saveToLocalStorage();
    }
}

function renderTasks(tasks) {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('tasks');

        const taskText = document.createElement('p');
        taskText.id = `task-text${index}`;
        taskText.textContent = task;

        const crudButtons = document.createElement('div');
        crudButtons.classList.add('crud-buttons');

        const checkButton = document.createElement('button');
        checkButton.id = 'crud-btn';
        checkButton.innerHTML = '<img src="Check.png" alt="Check">';
        checkButton.addEventListener('click', () => done_task(index));
        

        
        const editButton = document.createElement('button');
        editButton.id = 'crud-btn';
        editButton.innerHTML = '<img src="Icon.png" alt="Check">';
        editButton.addEventListener('click', () => edit_task(index));

        const deleteButton = document.createElement('button');
        deleteButton.id = 'crud-btn';
        deleteButton.innerHTML = '<img src="TrashSimple.png" alt="Check">';
        deleteButton.addEventListener('click', () => del_task(index));


        crudButtons.appendChild(checkButton);
        crudButtons.appendChild(editButton);
        crudButtons.appendChild(deleteButton);

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(crudButtons);

        container.appendChild(taskDiv);
    });

    const total_tasks = document.getElementById("show-total-tasks");
    total_tasks.textContent = `Tasks To Do - ${tasks.length}`;
    if (tasks.length === 0 && done_tasks_array.length > 0) {
        total_tasks.textContent = "ALL TASKS DONE";
        setTimeout(() => {
            total_tasks.textContent = `Look at you, all caught up! Time to kick back and bask in your productivity! 😎`;
        }, 1000); 
    }
}

function done_task(index) {
    if (index >= 0 && index < tasks.length) {
        let done = tasks.splice(index, 1);
        done_tasks_array.push(done[0]);
        renderTasks(tasks);
        renderdoneTasks(done_tasks_array);
        saveToLocalStorage();
    }
}

function del_task(index) {
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        renderTasks(tasks);
        saveToLocalStorage();
    }
}

function edit_task(index) {
    if (index >= 0 && index < tasks.length) {
        const taskDiv = document.getElementById(`task-text${index}`);
        const currentText = tasks[index];

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = currentText;
        inputField.classList.add('task-input');

        const saveButton = document.createElement('button');
        saveButton.textContent = 'save';
        saveButton.classList.add("save-btn");
        saveButton.addEventListener('click', () => {
            const newTaskText = inputField.value.trim();
            if (newTaskText !== '') {
                tasks[index] = newTaskText;
                renderTasks(tasks);
                saveToLocalStorage();
            } else {
                alert('Task text cannot be empty.');
            }
        });

        taskDiv.innerHTML = '';
        taskDiv.appendChild(inputField);
        taskDiv.appendChild(saveButton);
    }
}

function renderdoneTasks(done_tasks_array) {
    const container = document.getElementById('done-tasks-container');
    container.innerHTML = '';

    done_tasks_array.forEach((done_task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('tasks');

        const taskText = document.createElement('p');
        taskText.id = `done-task-text${index}`;
        taskText.textContent = done_task;
        taskText.style.textDecoration = 'line-through';
        taskDiv.appendChild(taskText);
        container.appendChild(taskDiv);
    });

    const tasks_done = document.getElementById("show-tasks-done");
    tasks_done.textContent = `Done - ${done_tasks_array.length}`;
}

window.onload = function() {
    renderTasks(tasks);
    renderdoneTasks(done_tasks_array);
};

