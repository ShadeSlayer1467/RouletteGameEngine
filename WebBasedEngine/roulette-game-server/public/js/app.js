// public/js/app.js

// Helper function to login a user
function login(email, password) {
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);  // Store the token in localStorage
            alert('Login successful');
            showBetSection();
            fetchBalance();  // Fetch the user's balance after login
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Helper function to register a new user
function register(username, email, password) {
    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User registered successfully") {
            alert('Registration successful. Please login.');
            showLoginSection();
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Helper function to fetch the user's balance
function fetchBalance() {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    fetch('/api/users/balance', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch balance');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('balance').textContent = data.balance;
    })
    .catch(error => console.error('Error:', error));
}

// Helper function to place a bet
function placeBet() {
    const amount = document.getElementById('bet-amount').value;
    const category = document.getElementById('bet-category').value;
    const type = document.getElementById('bet-type').value;
    const token = localStorage.getItem('token');  // Retrieve the token

    if (!token) {
        return alert('Not authenticated');
    }

    if (amount <= 0) {
        return alert('Bet amount must be greater than zero');
    }

    if (!category || !type) {
        return alert('Please select both bet category and bet type');
    }

    fetch('/api/games/bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token  // Include the token in the Authorization header
        },
        body: JSON.stringify({ amount, betType: category, betValue: type })
    })
    .then(response => response.json())
    .then(data => {
        displayResult(data);
        fetchBalance();  // Update the balance display after placing a bet
    })
    .catch(error => console.error('Error:', error));
}

// Function to display the result in a structured format
function displayResult(data) {
    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = `
        <p>Roulette Result: ${data.rouletteResult}</p>
        <p>Bet Amount: ${data.bets[0].amount}</p>
        <p>Bet Type: ${data.bets[0].betType}</p>
        <p>Bet Value: ${data.bets[0].betValue}</p>
        <p>Payout: ${data.bets[0].payout}</p>
        <p>Game Date: ${new Date(data.gameDate).toLocaleString()}</p>
    `;
    document.getElementById('results-container').style.display = 'block';
}

// Toggle password visibility
function togglePasswordVisibility(checkboxId, passwordInputId) {
    const checkbox = document.getElementById(checkboxId);
    const passwordInput = document.getElementById(passwordInputId);
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });
}

// Show login section
function showLoginSection() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('bet-section').style.display = 'none';
    document.getElementById('results-container').style.display = 'none';
}

// Show register section
function showRegisterSection() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
    document.getElementById('bet-section').style.display = 'none';
    document.getElementById('results-container').style.display = 'none';
}

// Show bet section
function showBetSection() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('bet-section').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
}

// Attach event listeners to the form submission buttons
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    login(email, password);
});
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    register(username, email, password);
});
document.getElementById('bet-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission
    placeBet();
});

// Attach password visibility toggle handlers
togglePasswordVisibility('register-show-password', 'register-password');
togglePasswordVisibility('login-show-password', 'login-password');

// Attach event listener to the "Register" button
document.getElementById('go-to-register').addEventListener('click', function() {
    showRegisterSection();
});

// Populate bet type based on category
document.getElementById('bet-category').addEventListener('change', function() {
    const category = this.value;
    const betTypeSelect = document.getElementById('bet-type');
    betTypeSelect.innerHTML = ''; // Clear existing options

    switch (category) {
        case 'number':
            for (let i = 0; i <= 36; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                betTypeSelect.appendChild(option);
            }
            break;
        case 'color':
            const colors = ['black', 'red'];
            colors.forEach(color => {
                const option = document.createElement('option');
                option.value = color;
                option.textContent = color;
                betTypeSelect.appendChild(option);
            });
            break;
        case 'evenodd':
            const evenodd = ['even', 'odd'];
            evenodd.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                betTypeSelect.appendChild(option);
            });
            break;
        case 'dozen':
            const dozens = ['first', 'second', 'third'];
            dozens.forEach(dozen => {
                const option = document.createElement('option');
                option.value = dozen;
                option.textContent = dozen;
                betTypeSelect.appendChild(option);
            });
            break;
        case 'column':
            const columns = ['first', 'second', 'third'];
            columns.forEach(column => {
                const option = document.createElement('option');
                option.value = column;
                option.textContent = column;
                betTypeSelect.appendChild(option);
            });
            break;
        case 'highlow':
            const highlow = ['low', 'high'];
            highlow.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                betTypeSelect.appendChild(option);
            });
            break;
    }
});

// Show the login section by default when the page loads
showLoginSection();
