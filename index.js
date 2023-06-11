const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));

const excludeJsonMiddleware = (req, res, next) => {
  if (req.method === 'GET' && req.path === '/api/user') {
    next();
  } else {
    express.json()(req, res, next);
  }
};

app.use(excludeJsonMiddleware)

app.use(routes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
