const express = require("express")
const dbItems = require("../db/dbItems")
const db = require("../db/dbItems")
const app = express.Router()

app.get('/item/:index', (req, res) => {
    res.send(db[req.params.index])
})

app.get('/item/', (req, res) => {
    res.send(db)
})
// put Item
app.put('/item/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

//delete Item
app.delete('/item/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })
    if (a.includes(id) === false) {
        res.status(400).send("gagal delete, id tidak ditemukan")
    } else {
        var index = db.map(function (items) {
            return items.id
        }).indexOf(id);
        //db[index] = req.body
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }

})
module.exports = app