const express = require("express")
const dbFriends = require("../db/dbFriends")
const db = require("../db/dbFriends")
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

//delete Friend
app.delete('/friend/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })
    
    if (a.includes(id) === false) {
        res.status(400).send("gagal delete, id tidak ditemukan")
    } else {
        var index = db.map(function (friends) {
            return friends.id
        }).indexOf(id);
        //db[index] = req.body
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }
    
})

module.exports = app