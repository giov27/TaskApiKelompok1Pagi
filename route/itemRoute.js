const express = require("express")
const db = require("../db/dbItems")
const app = express.Router()

// CRUD Item
app.put('/item/:id', (req, res) => {
    db[req.params.id] = req.body
    res.send(req.body)
})

app.put('/item/:id', (req, res) => {
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

// app.put("/item/:id", (req, res) => {
//     const id = req.params.id
//     var index = db.map(function (item) {
//         return item.id
//     }).indexOf(Number(id));
//     if (db[index] === undefined) {
//         res.status(400).send("hayohloh data nggak ada")
//     } else {
//         res.send(db[index])
//     }
// })

module.exports = app