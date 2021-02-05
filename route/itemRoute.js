const express = require('express')
const db = require("../db/dbItems")
const app = express.Router()

app.get("/item", (req, res) => {
    res.send(db)
})

app.get("/item/:id", (req, res) => {
    const id = req.params.id
    var index = db.map(function (item) {
        return item.id
    }).indexOf(Number(id));
    if (db[index] === undefined) {
        res.status(400).send("Data not found")
    } else {
        res.send(db[index])
    }
})

app.get('/eror', (req, res) => {
    console.log(message)
    message = "Ini halaman Eror"
    // eror tampil di node
})

module.exports = app