const sqlite3 = require('sqlite3').verbose();

// Erstellen Sie eine Verbindung zur Datenbank
const db = new sqlite3.Database('./database.db');

// Definieren Sie die Datenstruktur
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  );
`);

// Schließen Sie die Verbindung
db.close();

// Funktion zum Anmelden
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Wenn der Benutzer erfolgreich eingeloggt ist, zeigen wir die neue Seite
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('welcome-page').style.display = 'block';
        document.getElementById('username').innerText = username;
    } else {
        alert('Falscher Benutzername oder Passwort!');
    }
}

// Funktion zum Ausloggen
function logoutUser() {
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('username').innerText = '';
}

// Event-Listener für die Anmeldeform
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    loginUser(username, password);
});

// Event-Listener für das Ausloggen
document.getElementById('logout-button').addEventListener('click', () => {
    logoutUser();
});