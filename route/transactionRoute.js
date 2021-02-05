const express = require("express")
const db = require("../db/dbTransactions")
const app = express.Router()


// put Transaction
app.put('/Transaction/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

//delete Transaction
app.delete('/Transaction/:index', (req, res) => {
    const index = req.params.index 
    const deletedItem = db.splice(index, 1)
    res.send(deletedItem)
})

module.exports = app