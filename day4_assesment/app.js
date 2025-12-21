const countDisplay = document.getElementById('count');
const btnDecrease = document.getElementById('btn-decrease');
const btnReset = document.getElementById('btn-reset');
const btnIncrease = document.getElementById('btn-increase');

let count = 0;

const updateDisplay = () => {
    countDisplay.textContent = count;
    if (count > 0) countDisplay.style.color = 'green';
    else if (count < 0) countDisplay.style.color = 'red';
    else countDisplay.style.color = '#4f46e5';
};

btnIncrease.addEventListener('click', () => {
    count++;
    updateDisplay();
});

btnDecrease.addEventListener('click', () => {
    count--;
    updateDisplay();
});

btnReset.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

const form = document.getElementById('practice-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const small = formGroup.querySelector('.error-msg');
    small.textContent = message;
};

const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
};

const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (username.value.trim() === '') {
        showError(username, 'Username is required');
        isValid = false;
    } else {
        showSuccess(username);
    }

    if (email.value.trim() === '') {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Email is not valid');
        isValid = false;
    } else {
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    } else {
        showSuccess(password);
    }

    if (isValid) {
        alert('Form Submitted Successfully!');
        console.log({
            username: username.value,
            email: email.value,
            password: password.value
        });
    }
});
