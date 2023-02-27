const router = require('express').Router();
const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid/v4');

router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../db/db.json')),
);

router.post('/notes', (req, res) => {
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
});

router.delete('/notes/:id', (req, res) => {
  let notesToDelete = req.params.id;

  fs.readFile('./db/db.json', 'utf8').then((data, err) => {
    if (err) {
      throw err;
    }
    let json = JSON.parse(data);
    console.log('BEFORE', json);

    for (let i = 0; i < json.length; i++) {
      if (json[i].id === notesToDelete) {
        json.splice(i, 1);
      }
    }

    console.log('LAST', json);
    fs.writeFile('./db/db.json', JSON.stringify(json)).then(() => {
      res.json({ ok: true });
    });
  });
});

module.exports = router;
