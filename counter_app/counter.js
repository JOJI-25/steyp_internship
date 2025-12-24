const count = document.getElementById('count');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const reset = document.getElementById('reset');


function updateCount(value) {
    count.textContent = value;

    if (value > 0) {
        count.style.color = 'green';
    } else {
        count.style.color = 'black';
    }
}
let currentCount = 0;

increment.addEventListener('click', () => {
    currentCount++;
    updateCount(currentCount);
});

decrement.addEventListener('click', () => {
    if (currentCount > 0) {
        currentCount--;
        updateCount(currentCount);
    }
});

reset.addEventListener('click', () => {
    currentCount = 0;
    updateCount(currentCount);
});