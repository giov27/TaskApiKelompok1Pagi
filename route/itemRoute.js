const express = require("express")
const db = require("../db/dbItems")
const app = express.Router()

app.get("/:path", (req, res) => {
    inierror
})

app.get("/item/", (req, res) => {
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

module.exports = app