const express = require("express")
const db = require("../db/dbFriends")
const app = express.Router()

app.get("/friend/", (req, res) => {
    res.send(db)
})

app.get("/friend/:id", (req, res) => {
    var index = db.map(function (friend) {
        return friend.id
    }).indexOf(Number(req.params.id));
    res.send(db[index])
})

app.post("/friend/", (req, res) => {
    db.push(req.body)
    res.send(req.body)
})

module.exports = app