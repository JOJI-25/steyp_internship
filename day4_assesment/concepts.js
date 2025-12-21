const setOutput = (id, text) => {
    document.getElementById(id).textContent = text;
};

function demoVariables() {
    var a = "Var Value";
    let b = "Let Value";
    const c = "Const Value";
    setOutput('output-variables', `var: ${a}\nlet: ${b}\nconst: ${c}`);
}

function demoDataTypes() {
    const nullVal = null;
    const arrayVal = [1, 2];
    const stringVal = "Hello";

    const result = `typeof null: ${typeof nullVal}\ntypeof [1,2]: ${typeof arrayVal}\ntypeof "Hello": ${typeof stringVal}`;
    setOutput('output-types', result);
}

function demoHoisting() {
    let output = "";

    output += `Accessing 'var x' before decl: undefined (Hoisted)\n`;
    var x = 10;

    try {
        output += `Accessing 'let y' before decl: ReferenceError (TDZ)\n`;
        let y = 20;
    } catch (e) {
        output += `Error caught: ${e.message}`;
    }

    setOutput('output-hoisting', output);
}

function demoLoops() {
    let result = "Loop Result: ";
    for (let i = 1; i <= 5; i++) {
        result += i + (i < 5 ? ", " : "");
    }
    setOutput('output-loops', result);
}

function demoScope() {
    let output = "";
    let globalMsg = "Global";

    if (true) {
        let blockMsg = "Block-Scoped";
        var funcMsg = "Function-Scoped (var)";
        output += `Inside Block: ${blockMsg}\n`;
    }

    output += `Outside: ${globalMsg}\n`;
    try {
        console.log(blockMsg);
    } catch (e) {
        output += `Accessing blockVar outside: Error (Hidden)`;
    }

    setOutput('output-scope', output);
}

function demoArrays() {
    const users = [
        { name: "Alice", active: true },
        { name: "Bob", active: false },
        { name: "Charlie", active: true }
    ];

    const activeNames = users
        .filter(u => u.active)
        .map(u => u.name)
        .join(", ");

    setOutput('output-arrays', `All Users: Alice, Bob, Charlie\nActive (Filtered & Mapped): ${activeNames}`);
}

function demoCallStack() {
    let output = "Step 1: Calling First Function...\n";

    function first() {
        return "Step 2: Inside First -> Calling Second...\n" + second();
    }

    function second() {
        return "Step 3: Inside Second -> Returning...";
    }

    output += first();
    setOutput('output-stack', output);
}

const debounceInput = document.getElementById('debounce-input');
const debounceOutput = document.getElementById('output-debounce');

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const handleDebouncedInput = (e) => {
    debounceOutput.textContent = `Action Triggered: ${e.target.value}`;
    debounceOutput.style.backgroundColor = '#d1fae5';
    setTimeout(() => debounceOutput.style.backgroundColor = '#f1f5f9', 200);
};

const processedInput = debounce(handleDebouncedInput, 500);

if (debounceInput) {
    debounceInput.addEventListener('keyup', (e) => {
        debounceOutput.textContent = "Typing...";
        debounceOutput.style.backgroundColor = '#fef3c7';
        processedInput(e);
    });
}
