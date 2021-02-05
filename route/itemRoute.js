const express = require('express')
const db = require("../db/dbItems")
const app = express.Router()

// app.get("/:path", (req, res) => {
//     inierror
// })

app.get("/item", (req, res) => {
    res.send(db)
})

app.get("/item/:id", (req, res) => {
    var index = db.map(function (item) {
        return item.id
    }).indexOf(Number(req.params.id));
    res.send(db[index])
})

app.post("/item/", (req, res) => {
    db.push(req.body)
    res.send(req.body)
})

app.get("/item/", (req, res) => {
    res.send(db)
})

app.get("/item/:id", (req, res) => {
    const id = req.params.id
    if (!Number(id)) {
        res.status(400).send("Masukkan angka yaa :)")
    } else if (db.length < id) {
        res.status(400).send(`Mohon maaf, tidak ada data items dengan id ${id}`)
    } else {
        var index = db.map(function (item) {
            return item.id
        }).indexOf(Number(id));
        res.send(db[index])
    }
})

app.post("/item/", (req, res) => {
    db.push(req.body)
    res.send(req.body)
})

app.get('/eror', (req, res) => {
    console.log("Ini Halaman Eror")
})

module.exports = app