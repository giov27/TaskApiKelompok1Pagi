const express = require("express")
const dbFriends = require("../db/dbFriends")
const db = require("../db/dbFriends")
const app = express.Router()

// CRUD Friend
app.get("/friend", (req, res) => {
    res.send(db)
})

app.put('/friend/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })
    console.log(id);
    console.log(a);
    console.log(a.includes(id));
    if (a.includes(id) === false) {
        console.log("ini salah");
        res.status(400).send("tolong masukan id friend dengan benar")
    } else if (!Number(a.includes(id))) {
        res.status(400).send("Cannot update")
    } else {
        var index = db.map(function (friends) {
            return friends.id
        }).indexOf(id);
        db[index] = req.body
        res.send(req.body)
        console.log("ini benar");
    }
})

app.put("/friend", (req, res) => {
    const createDb = {
        id: db.length,
        userId: req.body.userId,
        name: req.body.name
    }
    if (!db.length || db.length < 1) {
        res.status(400).send('Mohon isi id dengan benar')
        return;
    } else if ((!req.body.userId || req.body.userId < 1)) {
        res.status(400).send('Mohon isi id dengan benar')
        return;
    } else {
        db.friend(createDb)
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