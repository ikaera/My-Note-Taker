const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = precess.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// HTML routes:
// GET /notes should return the notes.html file.
// GET * should return the index.html file.

// API routes:
// GET /api/notes should read the db.json file and return all saved notes as JSON.
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT} 🚀`)
// Bonus:
// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
