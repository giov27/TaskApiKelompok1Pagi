const express = require("express")
const db = require("../db")
const app = express.Router()

// CRUD Item
app.put('/item/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

// CRUD Friend
app.put('/friend/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

// CRUD Transaction
app.put('/Transaction/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})
module.exports = app