const express = require('express');
const router = express.Router();
let note = require(`/Users/monke/bootcamp/Challenges/Note-Taker/Develop/db/db.json`);

// GET
router.get("/api/notes", (req, res) => {
    res.json(note);
});

// POST
router.post("/api/notes", (req, res) => {
    const newNote = req.body;
    note.push(newNote);
    res.json(note);
});

// DELETE
router.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const removeIndex = note.findIndex(n => n.id === noteId);

    if (removeIndex !== -1) {
        note.splice(removeIndex, 1);
        res.json(note);
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

module.exports = router;

