const express = require("express")
const db = require("../db")
const app = express.Router()

// CRUD Friend
app.put('/friend/:id', (req, res) => {
    db[req.params.id] = req.body
    res.send(req.body)
})

app.put('/friend/:id', (req, res) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("hayooo lupa temen nih")
    } else if ((db.length - 1) < Number(id)) {
        res.status(400).send("teman anda sudah bener?")
    } else {
        db[req.params.id] = req.body
        res.send(req.body)
    }
})

module.exports = app