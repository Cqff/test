document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display user information upon page load
    fetchUserInfo();

    const logoutButton = document.getElementById('logout_button');
    logoutButton.addEventListener('click', logoutUser);
});

function fetchUserInfo() {
    let userEmail = sessionStorage.getItem('email') ;
    console.log('Email:', userEmail);

    if(!userEmail) {
        console.error('User email not found');
        return;
    }

    fetch('http://localhost/api/Find_Customer_ID.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        // Send the necessary information, like customer ID, as JSON
        body: 'email=' + encodeURIComponent(userEmail),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data.response === 'success') {
            document.getElementById('show_name').textContent = data.CUSTOMER_Name;
            document.getElementById('gender_call').textContent = data.CUSTOMER_Gender === '1' ? '先生' : '小姐';
        } else {
            console.error('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });
}

function logoutUser() {
    // Here you can clear session storage, cookies or any authentication tokens
    sessionStorage.clear();
    
    // Redirect to login page or perform cleanup
    window.location.href = 'login.html'; // Modify as necessary
}