const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const util = require("util");
const db = "./public/db/db.json";

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

// API Routes
router.get("/notes", async (req, res) => {
try {
    const data = await read(db, "utf8")
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

router.post("/notes", async (req, res) => {
try {
    const note = req.body
    const data = await read(db, "utf8")
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

router.delete("/notes/:id", async (req, res) => {
try {
    const noteDelete = parseInt(req.params.id)
    const data = await read(db, "utf8")
    const noted = JSON.parse(data).filter((note) => note.id !== noteDelete)
    await write(db, JSON.stringify(noted))
    res.send("OK")
} catch (error) {
    console.log(`${error.message}`)
}
});

module.exports = router;
