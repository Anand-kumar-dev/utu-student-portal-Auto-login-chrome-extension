document.addEventListener('DOMContentLoaded', () => {
    // Get elements from the DOM
    const loginForm = document.getElementById('loginForm');
    const enrollNoInput = document.getElementById('enrollNo');
    const passwordInput = document.getElementById('password');
    const statusEl = document.getElementById('status');

    // Handle form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        statusEl.textContent = '';
        statusEl.className = '';
        enrollNoInput.classList.remove('error');
        passwordInput.classList.remove('error');

        const enrollno = enrollNoInput.value.trim();
        const password = passwordInput.value.trim();

        let hasError = false;

        if (!enrollno) {
            statusEl.textContent = 'Enrollment number cannot be empty.';
            statusEl.className = 'error';
            enrollNoInput.classList.add('error');
            hasError = true;
        }

        if (!password) {
            statusEl.textContent += (hasError ? ' ' : '') + 'Password cannot be empty.';
            statusEl.className = 'error';
            passwordInput.classList.add('error');
            hasError = true;
        }


        if (hasError) {
            return;
        }

        try {
            chrome.storage.local.set({
                Enrollment: enrollno,
                Password: password
            }, () => {
                // Check for runtime errors during storage
                if (chrome.runtime.lastError) {
                    console.error('Error setting storage:', chrome.runtime.lastError);
                    statusEl.textContent = 'Failed to save credentials.';
                    statusEl.className = 'error';
                } else {
                    console.log('Credentials saved successfully.');
                    statusEl.textContent = 'Credentials saved successfully!';
                    statusEl.className = 'success';
                    
                    // Optionally, close the popup after a short delay
                    setTimeout(() => {
                        window.close();
                    }, 1500);
                }
            });
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            statusEl.textContent = 'An unexpected error occurred.';
            statusEl.className = 'error';
        }
    });
});