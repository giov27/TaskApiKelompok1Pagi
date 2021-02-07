const express = require("express")
const db = require("../db/dbItems")
// const dbAuth = require("../db/dbAuth")
const app = express.Router()

// CRUD Item
// Get all item
app.get("/item", (req, res) => {
    res.send(db)
})

// Get item by id
app.get("/item/:id", (req, res) => {
    const id = req.params.id
    var index = db.map(function (item) {
        return item.id
    }).indexOf(Number(id));
    if (db[index] === undefined) {
        res.status(400).send("Data tidak ditemukan")
    } else {
        res.send(db[index])
    }
})

// Post new item
app.post("/item", (req, res) => {
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

// Put item by id
app.put('/item/:id', (req, res) => {
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

    if (a.includes(id) === false) {
        res.status(400).send("Silahkan memasukkan ID yang benar")
    } else if (!arrayEqual(checkA, checkB)) {
        res.status(400).send("Mohon maaf anda memasukkan property yang tidak sesuai")
    } else if (typeof createDb.name !== "string") {
        res.status(400).send("Silahkan memasukkan nama yang sesuai")
    } else if (typeof createDb.userId !== "number") {
        res.status(400).send("Silahkan memasukkan ID user yang sesuai")
    } else {
        var index = db.map(function (item) {
            return item.id
        }).indexOf(id);
        db[index] = {
            id,
            userId: req.body.userId,
            name: req.body.name
        }
        res.send(req.body)
    }
})

// Delete item by id
app.delete('/item/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })
    if (a.includes(id) === false) {
        res.status(400).send("Data tidak dapat dihapus, ID tidak ditemukan")
    } else {
        var index = db.map(function (items) {
            return items.id
        }).indexOf(id);
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }
})

module.exports = app