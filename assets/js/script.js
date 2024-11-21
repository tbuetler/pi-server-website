const db = new sqlite3.Database('./database.db');

document.getElementById('logout-button').addEventListener('click', () => {
    // Hier kannst du die Logout-Funktionalität implementieren
    console.log('Logout-Button geklickt!');
    window.location.href = "index.html";
    window.location.replace("index.html");
});