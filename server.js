const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const util = require('util');
const db = './public/db/db.json';

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

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

// API Routes
app.get('/api/notes', async (req, res) => {
  try {
    const data = await read(db, 'utf8')
    let noted
    if (data) {
      noted = JSON.parse(data)
    } else {
      noted = []
    }
    res.json(noted)
  } catch (error) {
    console.log(`${error.message}`)
  }
});


app.post('/api/notes', async (req, res) => {
  try {
    const note = req.body
    const data = await read(db, 'utf8')
    let noted
    if (data) {
      noted = JSON.parse(data)
      noted.push(note)
    } else {
      noted = [note]
    }
    note.id = noted.length
    await write(db, JSON.stringify(noted))
    res.json(note)
  } catch (error) {
    console.log(` ${error.message}`)
  }
});


app.delete('/api/notes/:id', async (req, res) => {
  try {
    const noteDelete = parseInt(req.params.id)
    const data = await read(db, 'utf8')
    const noted = JSON.parse(data).filter((note) => note.id !== noteDelete)
    await write(db, JSON.stringify(noted))
    res.send('OK')
  } catch (error) {
    console.log(`${error.message}`);
  }
});

// Catch-all route to redirect to the homepage
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, './public/index.html'))
);



app.listen(PORT, () =>
  console.log(`Roger Roger at http://localhost:${PORT}`)
);



