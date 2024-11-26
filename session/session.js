const cookie = require('cookie');
const session = {};

function startSession(res, email) {
  const sessionId = crypto.randomBytes(16).toString('hex');
  session[sessionId] = { email };
  res.setHeader('Set-Cookie', cookie.serialize('sessionId', sessionId, { httpOnly: true, maxAge: 3600 }));
}

function getSession(req) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const sessionId = cookies.sessionId;
  return session[sessionId] || null;
}

module.exports = { startSession, getSession };
