const express = require('express')
const db = require("../db/dbFriends")
const app = express.Router()

app.get("/friend", (req, res) => {
    res.send(db)
})

app.get("/friend/:id", (req, res) => {
    const id = req.params.id
    var index = db.map(function (friend) {
        return friend.id
    }).indexOf(Number(id));
    if (db[index] === undefined) {
        res.status(400).send("Data not found")
    } else {
        res.send(db[index])
    }
})

app.get('/eror', (req, res) => {
    console.log(message)
    message = "Ini halaman Eror"
    // eror tampil di node
})

app.post("/friend/", (req, res) => {
    db.push(req.body)
    res.send(req.body)
})

app.get('/eror', (req, res) => {
    console.log("Ini Halaman Eror")
    // eror tampil di node
})

module.exports = app