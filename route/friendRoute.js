const express = require("express")
const db = require("../db/dbFriends")
const app = express.Router()

// CRUD put Friend
app.put('/friend/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

//delete Friend
app.delete('/friend/:index', (req, res) => {
    const index = req.params.index
    const deletedItem = db.splice(index, 1)
    res.send(deletedItem)
})

module.exports = app