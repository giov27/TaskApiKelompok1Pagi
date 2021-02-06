const express = require("express")
const dbTransactions = require("../db/dbTransactions")
const db = require("../db/dbTransactions")
const app = express.Router()


// put Transaction
app.put('/Transaction/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
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