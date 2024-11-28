const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Pfad zur bestehenden Datenbank
const dbPath = path.join(__dirname, 'database.sqlite');

// Verbindet mit der bestehenden SQLite-Datenbank
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Datenbankverbindung fehlgeschlagen:', err.message);
    } else {
        console.log('Mit der SQLite-Datenbank verbunden');
    }
});
