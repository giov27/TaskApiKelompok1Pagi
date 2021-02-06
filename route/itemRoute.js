const express = require("express")
const db = require("../db/dbItems")
const app = express.Router()

// CRUD Item
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
app.post("/item", (req, res) => {
    const createDb = {
        id: db.length + 1,
        userId: req.body.userId,
        name: req.body.name
    }
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Mohon isi name lebih dari 3 character')
        return;
    } else if ((!req.body.userId || req.body.userId.length < 3)) {
        res.status(400).send('Mohon isi  userId lebih dari 3 character')
        return;
    } else {
        db.push(createDb)
        res.send(req.body)
    }

})


module.exports = app