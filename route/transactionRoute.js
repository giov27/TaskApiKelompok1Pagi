const express = require("express")
const db = require("../db")
const app = express.Router()

// CRUD Transaction
app.put('/transaction/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

app.put('/transaction/:id', (req, res) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("hayoo id hayoo")
    } else if ((db.length - 1) < Number(id)) {
        res.status(400).send("apakah anda memasukkan id dengan benar?")
    } else {
        db[req.params.id] = req.body
        res.send(req.body)
    }
})

module.exports = app