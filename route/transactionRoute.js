const express = require('express')
const db = require("../db/dbTransactions")
const app = express.Router()

app.get("/transaction", (req, res) => {
    res.send(db)
})

app.get("/transaction/:id", (req, res) => {
    var index = db.map(function (transaction) {
        return transaction.id
    }).indexOf(Number(req.params.id));
    res.send(db[index])
})

app.post("/transaction/", (req, res) => {
    db.push(req.body)
    res.send(req.body)
})


app.get("/transaction/", (req, res) => {
    res.send(db)
})

app.get("/transaction/:id", (req, res) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("Masukkan angka yaa :)")
    } else if (db.length < id || 0) {
        res.status(400).send(`Mohon maaf, tidak ada data transaction dengan id ${id}`)
    } else {
        var index = db.map(function (transaction) {
            return transaction.id
        }).indexOf(Number(id));
        res.send(db[index])
    }
})

app.post("/transaction/", (req, res) => {
    db.push(req.body)
    res.send(req.body)
})

app.get('/eror', (req, res) => {
    console.log("Ini Halaman Eror")
})

module.exports = app