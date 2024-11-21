// Datenbank
const db = {
    users: []
};

// Funktion zum Registrieren
function registerUser(username, password) {
    const user = {
        username,
        password
    };
    db.users.push(user);
    localStorage.setItem('users', JSON.stringify(db.users));
}

// Funktion zum Anmelden
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Anmeldung erfolgreich!');
        // Hier können wir den Benutzer anmelden und ihn auf eine andere Seite weiterleiten
    } else {
        alert('Falscher Benutzername oder Passwort!');
    }
}

// Event-Listener für die Registrierform
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    registerUser(username, password);
});

// Event-Listener für die Anmeldeform
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    loginUser(username, password);
});