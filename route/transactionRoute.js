const express = require("express")
const db = require("../db/dbTransactions")
const app = express.Router()

// CRUD Transaction
app.put('/transaction/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

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
        friendId: req.body.freindId,
        itemId: req.body.itemId,
        nominal: req.body.nominal
    }
    // if (!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Mohon isi name lebih dari 3 character')
    //     return;
    if ((!req.body.userId || req.body.userId.length < 3)) {
        res.status(400).send('Mohon isi  userId lebih dari 3 character')
        return;
    } else if ((!req.body.friendId || req.body.friendId.length < 3)) {
        res.status(400).send('Mohon isi  friendId lebih dari 3 character')
        return;
    } else if ((!req.body.itemId || req.body.itemId.length < 3)) {
        res.status(400).send('Mohon isi  itemId lebih dari 3 character')
        return;
    } else if ((!Number(req.body.itemId))) {
        res.status(400).send('Mohon isi dengan angka')
        return;
    } else {
        db.push(createDb)
        res.send(req.body)
    }
})

module.exports = app