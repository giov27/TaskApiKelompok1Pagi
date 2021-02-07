const express = require("express")
const db = require("../db/dbTransactions")
const app = express.Router()

// CRUD Transaction
app.put('/transaction/:id', (req, res) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("hayoo id hayoo")
    } else if ((db.length - 1) < Number(id)) {
        res.status(400).send("apakah anda memasukkan id dengan benar?")
    } else {
        db[req.params.id] = req.body
        res.send(req.body)
    }
})

app.get("/transaction", (req, res) => {
    res.send(db)
})

app.get("/transaction/:id", (req, res) => {
    const id = req.params.id
    var index = db.map(function (transaction) {
        return transaction.id
    }).indexOf(Number(id));
    if (db[index] === undefined) {
        res.status(400).send("Data not found")
    } else {
        res.send(db[index])
    }
})
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

module.exports = app