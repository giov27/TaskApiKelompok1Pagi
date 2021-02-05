const express = require("express")
const db = require("../db")
const app = express.Router()

// Get the User's Data in DB
app.get('/', (req, res) => {
    res.send(db)
});

// User Register Function
app.post('/register', (req, res) => {
    db.push(req.body);
    res.send(req.body)
});

// User Login Function
app.post('/login', (req, res) => {
    db.push(req.body);
    res.send(req.body)
});

module.exports = app