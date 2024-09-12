// Check if the server is responding and reload the page if it is
async function reloadPageIfOnline() {
    try {
        const response = await fetch('.');
        if (response.status >= 200 && response.status < 500) {
            // We received a positive response --> RELOAD PAGE
            window.location.reload();
            return;
        }
    } catch {
        // We are still offline or the Server is not available
    }

    // Retry every 3 seconds
    window.setTimeout(reloadPageIfOnline, 3000);
}

reloadPageIfOnline();