const input = document.getElementById('todo-input');
const button = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem("todos")) || [];

todos.forEach(todo => addTask(todo.text, todo.completed));

button.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === '') {
        alert("Please write a task!");
        return;
    }
    addTask(text);
    input.value = '';
});

function addTask(text, completed = false) {
    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${text}</span>
        <button>Delete</button>
    `;

    todoList.appendChild(li);
    saveTodos();
}

function saveTodos() {
    todos = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        todos.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}




todoList.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
        event.target.parentElement.classList.toggle("completed");
        saveTodos();
    }

    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
        saveTodos();
    }
});