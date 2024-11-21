// Funktion zum Registrieren
function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = {
        username,
        password
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Funktion zum Anmelden
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Wenn der Benutzer erfolgreich eingeloggt ist, zeigen wir die neue Seite
        document.getElementById('welcome-page').style.display = 'none';
        document.getElementById('logged-in-page').style.display = 'block';
    } else {
        alert('Falscher Benutzername oder Passwort!');
    }
}

// Funktion zum Überprüfen, ob ein Benutzer existiert
function checkUser(username) {
    const users = JSON.parse(localStorage.getItem('users'));
    return users.find(u => u.username === username);
}

// Event-Listener für die Registrierform
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    if (!checkUser(username)) {
        registerUser(username, password);
        alert('Registrierung erfolgreich!');
    } else {
        alert('Benutzername bereits vergeben!');
    }
});

// Event-Listener für die Anmeldeform
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    loginUser(username, password);
});