const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const session = require('../session/session');
const db = require('../db/db');

// Login-Route
function login(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { email, password } = JSON.parse(body);
      userModel.findUserByEmail(email, (err, user) => {
        if (err || !user) {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ error: 'Invalid email or password' }));
          return;
        }

        const isValid = userModel.verifyPassword(user.password, user.salt, password);
        if (isValid) {
          session.startSession(res, email);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ message: 'Login successful' }));
        } else {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ error: 'Invalid email or password' }));
        }
      });
    });
  } else {
    // Login-HTML zurückgeben
    fs.readFile(path.join(__dirname, '../views/login.html'), (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
}

// Passwort ändern
function changePassword(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { newPassword } = JSON.parse(body);
      const userSession = session.getSession(req);
      
      if (!userSession) {
        res.writeHead(403, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'Not authenticated' }));
        return;
      }

      userModel.changePassword(userSession.email, newPassword, (err) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ error: 'Failed to change password' }));
        } else {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ message: 'Password changed successfully' }));
        }
      });
    });
  } else {
    // Passwort ändern-HTML zurückgeben
    fs.readFile(path.join(__dirname, '../views/change-password.html'), (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
}

// Passwort zurücksetzen
function resetPassword(req, res) {
  // Implementierung der Passwort-Reset-Logik
}

module.exports = { login, changePassword, resetPassword };
