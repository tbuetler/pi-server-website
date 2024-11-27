const http = require('http');
const authRoutes = require('./routes/auth');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/login') {
    authRoutes.login(req, res);
  } else if (parsedUrl.pathname === '/change-password') {
    authRoutes.changePassword(req, res);
  } else if (parsedUrl.pathname === '/reset-password') {
    authRoutes.resetPassword(req, res);
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(80, () => {
  console.log('Server running on http://localhost:80');
});
