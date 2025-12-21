const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const themeToggleBtn = document.getElementById('theme-toggle');
const sessionDisplay = document.getElementById('session-info');

const todoList = document.querySelector('.todo-list');
const body = document.querySelector('body');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️ Light Mode';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙 Dark Mode';
    }
});

if (!sessionStorage.getItem('sessionStart')) {
    sessionStorage.setItem('sessionStart', new Date().toLocaleTimeString());
}
sessionDisplay.textContent = `Session started: ${sessionStorage.getItem('sessionStart')}`;

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => renderTask(task));

function saveTasksToStorage() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(taskData) {
    const li = document.createElement('li');
    li.className = `todo-item ${taskData.completed ? 'completed' : ''}`;

    li.innerHTML = `
        <span>${taskData.text}</span>
        <div class="actions">
            <button class="btn-check">✔</button>
            <button class="btn-delete">✖</button>
        </div>
    `;

    todoList.appendChild(li);
}

function addTask() {
    const text = todoInput.value.trim();
    if (text === '') return;

    renderTask({ text: text, completed: false });
    saveTasksToStorage();
    todoInput.value = '';
}

addBtn.addEventListener('click', addTask);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

todoList.addEventListener('click', (e) => {
    const target = e.target;
    const item = target.closest('.todo-item');

    if (!item) return;

    if (target.classList.contains('btn-delete')) {
        item.remove();
        saveTasksToStorage();
    }
    else if (target.classList.contains('btn-check')) {
        item.classList.toggle('completed');
        saveTasksToStorage();
    }
});
