const express = require("express")
const dbFriends = require("../db/dbFriends")
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


// put Friend
app.put('/friend/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
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