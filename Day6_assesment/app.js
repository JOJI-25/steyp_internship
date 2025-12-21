// --- API Project Main Logic (Modern Async/Await) ---

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// DOM Elements
const userGrid = document.getElementById('user-grid');
const loadingDiv = document.getElementById('loading');
const errorMsg = document.getElementById('error-msg');
const userForm = document.getElementById('add-user-form');

// 1. Fetch Users (GET) - Topic: Fetch API, Async/Await
async function fetchUsers() {
    showLoading(true);
    clearError();
    userGrid.innerHTML = ''; // Clear current list

    try {
        // Await the response
        const response = await fetch(API_URL);

        // Check for HTTP errors (404, 500)
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // Await JSON parsing - Topic: JSON Format
        const users = await response.json();

        // Topic: Display Data Dynamically
        renderUsers(users.slice(0, 6)); // Limit to 6 for demo

    } catch (error) {
        // Topic: Error Handling
        showError(`Failed to fetch users: ${error.message}`);
        console.error('Fetch error:', error);
    } finally {
        showLoading(false);
    }
}

// Render Helper
function renderUsers(users) {
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <button class="btn-delete" onclick="deleteUser(${user.id}, this)">X</button>
        `;
        userGrid.appendChild(card);
    });
}

// 2. Add User (POST) - Topic: HTTP Methods (POST)
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';

    const newUser = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(newUser), // Serialize JS Object to JSON
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) throw new Error('Failed to create user');

        const data = await response.json();

        // Manually update UI (since API is fake/mock)
        const dummyUser = { ...newUser, id: data.id || 101 };
        renderUsers([dummyUser]);

        userForm.reset();
        alert('User Created Successfully! (Added to bottom of list)');

    } catch (error) {
        showError(error.message);
    } finally {
        btn.textContent = originalText;
    }
});

// 3. Delete User (DELETE) - Topic: HTTP Methods (DELETE)
async function deleteUser(id, btnElement) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    const card = btnElement.parentElement;
    card.style.opacity = '0.5';

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete');

        // Remove from DOM on success
        card.remove();
        console.log(`User ${id} deleted successfully.`);

    } catch (error) {
        card.style.opacity = '1';
        alert('Error deleting user');
    }
}

// Utilities
function showLoading(show) {
    if (show) loadingDiv.classList.remove('hidden');
    else loadingDiv.classList.add('hidden');
}

function clearError() {
    errorMsg.classList.add('hidden');
    errorMsg.textContent = '';
}

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
}

// Init
document.getElementById('btn-refresh').addEventListener('click', fetchUsers);
fetchUsers(); // Load on start
