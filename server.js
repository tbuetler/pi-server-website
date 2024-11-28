const express = require("express");
const app = express();
const path = require("path");
const sqlite3 = require("sqlite3");

// SQLite-Datenbankverbindung herstellen
const database = new sqlite3.Database("./db/database.sqlite", (err) => {
    if (err) {
        console.error('Datenbankverbindung fehlgeschlagen:', err.message);
    } else {
        console.log('Mit der SQLite-Datenbank verbunden');
    }
});

// Setze den Pfad zu den Views (HTML-Dateien)
const viewsPath = path.join(__dirname, 'views');
app.set("views", viewsPath);

// Statische Dateien wie CSS und JS bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// JSON-Daten aus dem Body des Requests verarbeiten
app.use(express.json());

// Login-Seite rendern
app.get("/", (req, res) => {
    res.sendFile(path.join(viewsPath, 'login.html')); // Login-Seite
});

// Login-Post-Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Suche nach dem Benutzer in der Datenbank
    database.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else if (row) {
            // Wenn Benutzer gefunden wird, Login erfolgreich
            res.status(200).send("Login erfolgreich");
            res.sendFile(path.join(viewsPath, 'home.html')); // Nach dem Login zur Startseite weiterleiten
        } else {
            // Wenn kein Benutzer gefunden oder Passwort falsch
            res.status(401).send("Ungültige E-Mail oder Passwort");
        }
    });
});

// Server starten
app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});
