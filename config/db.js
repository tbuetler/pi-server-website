const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./user_data.db');  // SQLite-Datenbank

// Tabelle für Benutzer erstellen, falls noch nicht vorhanden
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
});

module.exports = db;
