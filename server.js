const express = require("express");
const app = express();
const path = require("path");
const sqlite3 = require("sqlite3");
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs'); // Zum Speichern der Logs in eine Datei

const database = new sqlite3.Database("./db/database.sqlite", (err) => {
    if (err) {
        console.error('Datenbankverbindung fehlgeschlagen:', err.message);
    } else {
        console.log('Mit der SQLite-Datenbank verbunden');
    }
});

const viewsPath = path.join(__dirname, 'views');
app.set("views", viewsPath);
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

// Login-Seite rendern
app.get("/", (req, res) => {
    const error = req.query.error; // Fehler aus der URL abfragen
    res.sendFile(path.join(viewsPath, 'login.html'), {
        error: error // Fehler zur HTML-Seite übergeben
    });
});

// Route für die Home-Seite
app.get("/home", (req, res) => {
    res.sendFile(path.join(viewsPath, 'home.html'));
});

// Login-Post-Route
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Benutzer aus der Datenbank abfragen
    database.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (row) {
            // Passwort überprüfen
            if (row.password === password) {
                res.redirect("/home");
            } else {
                res.redirect('/?error=Falsche E-Mail oder Passwort');
            }
        } else {
            res.redirect('/?error=Benutzer nicht gefunden');
        }
    });
});

// Route zum Speichern von Nachrichten im Log
app.post("/logMessage", (req, res) => {
    const message = req.body.message;

    if (message) {
        // Nachricht in einer Log-Datei speichern
        const logMessage = `${new Date().toISOString()} - ${message}\n`;

        fs.appendFile('./logs/messages.log', logMessage, (err) => {
            if (err) {
                console.error('Fehler beim Schreiben ins Log:', err);
                return res.status(500).json({ message: 'Fehler beim Speichern der Nachricht.' });
            }
            console.log('Nachricht wurde im Log gespeichert:', message);
            res.status(200).json({ message: 'Nachricht erfolgreich gespeichert.' });
        });

    } else {
        res.status(400).json({ message: 'Keine Nachricht empfangen.' });
    }
});

// Server starten
app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});
