const express = require("express");
const app = express();
const path = require("path");
const sqlite3 = require("sqlite3");
const session = require('express-session');

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
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.urlencoded({ extended: true })); // Zum Parsen von Formulardaten

// Login-Seite rendern
app.get("/", (req, res) => {
    res.sendFile(path.join(viewsPath, 'login.html'));
});

// Route für die Home-Seite
app.get("/home", (req, res) => {
    res.sendFile(path.join(viewsPath, 'home.html'));  // Sende die home.html-Datei
});


// Login-Post-Route
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log("Eingegebene E-Mail:", email);
    console.log("Eingegebenes Passwort:", password);

    // Benutzer aus der Datenbank abfragen
    database.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (row) {
            console.log("Datenbank-Passwort:", row.password);  // Debugging: Zeigt das gespeicherte Passwort

            // Passwort überprüfen
            if (row.password === password) {
                console.log("Passwort stimmt überein");
                res.redirect("/home");  // Weiterleitung nach erfolgreichem Login
            } else {
                console.log("Passwort stimmt nicht überein");
                res.status(401).json({ message: "Falsches Passwort" });
            }
        } else {
            console.log("Benutzer nicht gefunden");
            res.status(404).json({ message: "Benutzer nicht gefunden" });
        }
    });
});

// Middleware zum Schutz der Home-Seite
app.get("/home", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/");  // Wenn nicht eingeloggt, zur Login-Seite weiterleiten
    }
    res.sendFile(path.join(viewsPath, 'home.html'));
});

// Server starten
app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});
