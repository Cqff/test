document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const SESSION_TIMEOUT_MILLISECONDS = 2 * 60 * 60 * 1000; // 2 hours
    const SESSION_TIMEOUT_KEY = 'session_timeout';

    // Function to save login data to sessionStorage
    function saveLoginData(email, password, userId) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem(SESSION_TIMEOUT_KEY, Date.now().toString());
    }

    // Function to check if session is timed out
    function isSessionTimedOut() {
        const sessionStartTime = parseInt(sessionStorage.getItem(SESSION_TIMEOUT_KEY), 10);
        return Date.now() - sessionStartTime >= SESSION_TIMEOUT_MILLISECONDS;
    }

    // Function to check if login data exists in sessionStorage
    function hasSavedLoginData() {
        return sessionStorage.getItem('email') && sessionStorage.getItem('password');
    }

    // Function to handle login
    function handleLogin(email, password) {
        const url = 'http://localhost/api/customer_login.php';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': email,
                'password': password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.response === 'success') {
                sessionStorage.setItem('isLoggedIn', 'true');
                saveLoginData(email, password, data.customerId); // Save userId to sessionStorage
                // Redirect to homepage or perform necessary actions
                window.location.href = 'homepage.html';
            } else {
                alert('帳號或密碼有誤');
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        });
    }

    // Check if there is saved login data and auto-login
    if (hasSavedLoginData() && !isSessionTimedOut()) {
        const savedEmail = sessionStorage.getItem('email');
        const savedPassword = sessionStorage.getItem('password');
        emailInput.value = savedEmail;
        passwordInput.value = savedPassword;
        handleLogin(savedEmail, savedPassword);
    }

    // Handle form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email && password) {
            handleLogin(email, password);
        } else {
            alert('帳號密碼欄位必填');
        }
    });
});
