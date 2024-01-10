const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./public/routes/api');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Use the API routes from api.js
app.use('/api', apiRoutes);

// Catch-all route to redirect to the homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Roger Roger at http://localhost:${PORT}`)
);



