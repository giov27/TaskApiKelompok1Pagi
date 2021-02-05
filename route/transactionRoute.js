const express = require("express")
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

module.exports = app