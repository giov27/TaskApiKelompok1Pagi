const express = require("express")
const db = require("../db/dbFriends")
const { post } = require("./itemRoute")
const app = express.Router()

// CRUD Friend
// Get all friend
app.get("/friend", (req, res) => {
    res.send(db)
})

// Get friend by id
app.get("/friend/:id", (req, res) => {
    const id = req.params.id
    var index = db.map(function (friend) {
        return friend.id
    }).indexOf(Number(id));
    if (db[index] === undefined) {
        res.status(400).send("Data tidak ditemukan")
    } else {
        res.send(db[index])
    }
})

// Post new friend
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
        db.friend(createDb)
        res.send(req.body)
    }
})

// Put friend by id
app.put('/friend/:id', (req, res) => {
    const id = Number(req.params.id)
    const createDb = {
        id: req.body.id,
        userId: req.body.userId,
        name: req.body.name
    }
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })
    var checkA = [];
    Object.keys(req.body).forEach(function (obj) {
        checkA.push(obj);
    })
    checkA.push("id")
    var checkB = Object.keys(createDb);
    function arrayEqual(checkA, checkB) {
        return (checkA.length === checkB.length) && (checkA.every(val => checkB.includes(val)));
    }
    if (!Number(a.includes(id))) {
        res.status(400).send("Silahkan memasukkan angka pada ID")
    } else if (a.includes(id) === false) {
        res.status(400).send("Salah memasukan ID")
    } else if (!arrayEqual(checkA, checkB)) {
        res.status(400).send("Mohon maaf anda memasukkan property yang tidak sesuai")
    } else if (typeof createDb.name !== "string") {
        res.status(400).send("Silahkan memasukkan nama yang sesuai")
    } else if (typeof createDb.userId !== "number") {
        res.status(400).send("Silahkan memasukkan ID user yang sesuai")
    } else {
        var index = db.map(function (friend) {
            return friend.id
        }).indexOf(id);
        db[index] = {
            id,
            userId: req.body.userId,
            name: req.body.name
        }
        res.send(req.body)
    }
})

//Delete Friend by id
app.delete('/friend/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })

    if (a.includes(id) === false) {
        res.status(400).send("Data tidak dapat dihapus, ID tidak ditemukan")
    } else {
        var index = db.map(function (friends) {
            return friends.id
        }).indexOf(id);
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }

})

module.exports = app