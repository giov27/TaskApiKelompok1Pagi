const express = require("express")
const db = require("../db/dbFriends")
const { post } = require("./itemRoute")
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
        res.status(400).send("salah memasukan id")
    } else {
        var index = db.map(function (friends) {
            return friends.id
        }).indexOf(id);
        db[index] = req.body
        res.send(req.body)
        console.log("ini benar");
    }
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

app.post("/friend", (req, res) => {
    const createDb = {
        id: db.length + 1,
        userId: req.body.userId,
        name: req.body.name
    }
    var a = [];
    Object.keys(req.body).forEach(function (obj) {
        a.push(obj);
    })
    a.push("id")
    var b = Object.keys(createDb);
    function arrayEqual(a, b) {
        return (a.length === b.length) && (a.every(val => b.includes(val)));
    }
    if (!arrayEqual(a, b)) {
        res.status(400).send("Mohon maaf anda memasukkan property yang tidak sesuai")
    } else if (typeof createDb.name !== "string") {
        res.status(400).send("Silahkan memasukkan nama yang sesuai")
    } else if (typeof createDb.userId !== "number") {
        res.status(400).send("Silahkan memasukkan ID user yang sesuai")
    } else {
        db.push(createDb)
        res.send(req.body)
    }
})


module.exports = app