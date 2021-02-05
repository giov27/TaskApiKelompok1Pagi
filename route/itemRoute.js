const express = require("express")
const db = require("../db/dbItems")
const app = express.Router()

// put Item
app.put('/item/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

//delete Item
app.delete('/item/:index', (req, res) => {
    const index = req.params.index
    const deletedItem = db.splice(index, 1)
    res.send(deletedItem)
})
module.exports = app