const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`<h1>XYZ Solutions</h1><p><a href="/health">/health</a> | <a href="/api/version">/api/version</a></p>`);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.APP_VERSION || 'dev'
  });
});

app.get('/api/version', (req, res) => {
  res.json({
    version: process.env.APP_VERSION || 'dev',
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'local'
  });
});

// 404 für alles andere
app.use((req, res) => res.status(404).send('Not Found'));

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App running on http://localhost:${port}`));
}


