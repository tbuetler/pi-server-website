const db = require('../db/db');
const crypto = require('crypto');

// Passwort hashen und salzen
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hashedPassword };
}

// Passwort überprüfen
function verifyPassword(storedHash, salt, password) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return storedHash === hash;
}

// Benutzer anhand der E-Mail suchen
function findUserByEmail(email, callback) {
  db.get('SELECT * FROM users WHERE email = ?', [email], callback);
}

// Passwort ändern
function changePassword(email, newPassword, callback) {
  const { salt, hashedPassword } = hashPassword(newPassword);
  // db.run('UPDATE users SET password = ?, salt = ? WHERE email = ?', [hashedPassword, salt, email], callback);
}

module.exports = { findUserByEmail, changePassword, hashPassword, verifyPassword };
