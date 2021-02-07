const express = require("express")
const dbTransactions = require("../db/dbTransactions")
const db = require("../db/dbTransactions")
const app = express.Router()


// CRUD Transaction
app.get("/transaction", (req, res) => {
    res.send(db)
})

app.put('/transaction/:id', (req, res) => {
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
        res.status(400).send("salah memasukan id transaction")
    } else if (!Number(a.includes(id))) {
        res.status(400).send("Cannot update")
    } else {
        var index = db.map(function (transcation) {
            return transcation.id
        }).indexOf(id);
        db[index] = req.body
        res.send(req.body)
        console.log("ini benar");
    }
})

app.put("/transaction", (req, res) => {
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
        db.put(createDb)
        res.send(req.body)
    }
})


//delete Transaction
app.delete('/Transaction/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })
    
    if (a.includes(id) === false) {
        res.status(400).send("gagal delete, id tidak ditemukan")
    } else {
        var index = db.map(function (transactions) {
            return transactions.id
        }).indexOf(id);
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }
})

module.exports = app