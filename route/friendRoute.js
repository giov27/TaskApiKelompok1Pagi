const express = require('express')
const db = require("../db/dbFriends")
const app = express.Router()

// app.get("/friend", (req, res) => {
// res.send(db)
// })

app.get("/friend/:id", (req, res) => {
    var index = db.map(function (friend) {
        return friend.id
    }).indexOf(Number(req.params.id));
    res.send(db[index])
})

app.post("/friend/:id", (req, res) => {
    db.push(req.body)
    res.send(req.body)
})

app.get("/friend/", (req, res) => {
    res.send(db)
})

app.get("/friend/:id", (req, res) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("Masukkan angka yaa :)")
    } else if (db.length < id) {
        res.status(400).send(`Mohon maaf, tidak ada data friend dengan id ${id}`)
    } else {
        var index = db.map(function (friend) {
            return friend.id
        }).indexOf(Number(id));
        res.send(db[index])
    }
})

app.post("/friend/", (req, res) => {
    db.push(req.body)
    res.send(req.body)
})

app.get('/eror', (req, res) => {
    console.log("Ini Halaman Eror")
})
module.exports = app