const express = require("express")
const dbTransactions = require("../db/dbTransactions")
const db = require("../db/dbTransactions")
const app = express.Router()


// CRUD Transaction
// Get all transaction
app.get("/transaction", (req, res) => {
    res.send(db)
})

// Get transaction by id
app.get("/transaction/:id", (req, res) => {
    const id = req.params.id
    var index = db.map(function (transaction) {
        return transaction.id
    }).indexOf(Number(id));
    if (db[index] === undefined) {
        res.status(400).send("Data tidak ditemukan")
    } else {
        res.send(db[index])
    }
})

// Post new transaction
app.post("/transaction", (req, res) => {
    const createDb = {
        id: db.length + 1,
        userId: req.body.userId,
        friendId: req.body.friendId,
        itemId: req.body.itemId,
        nominal: req.body.nominal
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
    } else if (typeof createDb.userId !== "number" || typeof createDb.friendId !== "number" || typeof createDb.itemId !== "number") {
        res.status(400).send("Silahkan memasukkan ID yang sesuai")
    } else if (typeof createDb.nominal !== "number") {
        res.status(400).send("Silahkan memasukkan nominal yang sesuai")
    } else {
        db.push(createDb)
        res.send(req.body)
    }
})

// Put transaction by id
app.put('/transaction/:id', (req, res) => {
    const id = Number(req.params.id)
    const createDb = {
        id: req.body.id,
        userId: req.body.userId,
        friendId: req.body.friendId,
        itemId: req.body.itemId,
        nominal: req.body.nominal
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
    } else if (typeof createDb.userId !== "number" || typeof createDb.friendId !== "number" || typeof createDb.itemId !== "number") {
        res.status(400).send("Silahkan memasukkan ID yang sesuai")
    } else if (typeof createDb.nominal !== "number") {
        res.status(400).send("Silahkan memasukkan nominal yang sesuai")
    } else {
        var index = db.map(function (friend) {
            return friend.id
        }).indexOf(id);
        db[index] = {
            id,
            userId: req.body.userId,
            friendId: req.body.friendId,
            itemId: req.body.itemId,
            nominal: req.body.nominal
        }
        res.send(req.body)
    }
})

//delete Transaction by id
app.delete('/Transaction/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })

    if (a.includes(id) === false) {
        res.status(400).send("Data tidak dapat dihapus, ID tidak ditemukan")
    } else {
        var index = db.map(function (transactions) {
            return transactions.id
        }).indexOf(id);
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }
})

module.exports = app