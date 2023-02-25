const { text } = require('express');
const express = require('express');
const { writeFile } = require('fs');
const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid/v4');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// HTML routes:
// GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html')),
);

// API routes:
// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './db/db.json')),
);

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const newNotes = {
    title,
    text,
    id: uuid(),
  };
  fs.readFile('./db/db.json', 'utf8').then(file => {
    console.log(file);
    let parsedArr = JSON.parse(file);
    parsedArr.push(newNotes);
    fs.writeFile('./db/db.json', JSON.stringify(parsedArr)).then(() =>
      res.json(newNotes),
    );
  });
  // res.json(`${req.method} received.`);
});

// GET * should return the index.html file.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')),
);

app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT} 🚀`),
);
// Bonus:
// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.//
// app.delete('/api/notes/:id', (req, res) => {
//   // req.params.id;
//   // const { id } = req.params;
//   fs.readFile('./db/db.json', 'utf8').then(file => {
//     file.map();
//     fs.writeFile('./db/db.json', JSON.stringify(parsedArr)).then(
//       () => newNotes,
//     );
//   }

// });
