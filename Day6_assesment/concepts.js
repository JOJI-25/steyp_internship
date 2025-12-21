// --- Concepts Comparison Lab ---

function runComparisonDemo() {
    console.clear();
    console.log('%c --- 1. Promise Chain vs Async/Await ---', 'background: #222; color: #bada55');

    // Scenario: Fetching a single post
    const POST_URL = 'https://jsonplaceholder.typicode.com/posts/1';

    // A. The Old Way (.then/.catch)
    console.log('Starting .then() Fetch...');
    fetch(POST_URL)
        .then(response => {
            console.log('[Promise] Response received');
            return response.json();
        })
        .then(data => {
            console.log('[Promise] Data parsed:', data.title);
        })
        .catch(err => {
            console.error('[Promise] Error:', err);
        });


    // B. The Modern Way (Async/Await)
    // We wrap in an IIFE to use async keywords here instantly
    (async () => {
        try {
            console.log('Starting Async/Await Fetch...');
            const response = await fetch(POST_URL);
            console.log('[AsyncCompat] Response received');

            const data = await response.json();
            console.log('[AsyncCompat] Data parsed:', data.title);
        } catch (err) {
            console.error('[AsyncCompat] Error:', err);
        }
    })();

    // Explanation of CORS
    console.log('%c --- 2. What is CORS? ---', 'background: #222; color: #38bdf8');
    console.log(`
    CORS (Cross-Origin Resource Sharing) is a security feature.
    It blocks the browser from sharing resources between different origins
    unless the server explicitly allows it.
    
    Example: 
    Your Site: localhost:5500
    API: google.com/api
    
    If Google's server doesn't send "Access-Control-Allow-Origin: *",
    your browser will BLOCK the response to protect the user.
    `);
}
