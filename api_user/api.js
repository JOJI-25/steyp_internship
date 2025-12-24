const loadBtn = document.getElementById('loadBtn');
const userList = document.getElementById('userList');
loadBtn.addEventListener("click", loadUsers);

async function loadUsers() {
    try {
        userList.innerHTML = "<li>Loading...</li>";

        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        userList.innerHTML = "";

        data.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name;
            userList.appendChild(li);
        });

    } catch (error) {
        userList.innerHTML = "<li>Error loading users</li>";
        console.error(error);
    }
}