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
    var a = [];
    Object.keys(req.body).forEach(function (obj) {
        a.push(obj);
    })
    a.push("id")
    var b = Object.keys(createDb);
    function arrayEqual(a, b) {
        return (a.length === b.length) && (a.every(val => b.includes(val)));
    }
    if (!arrayEqual(a, b)) {
        res.status(400).send("Mohon maaf anda memasukkan property yang tidak sesuai")
    } else if (typeof createDb.name !== "string") {
        res.status(400).send("Silahkan memasukkan nama yang sesuai")
    } else if (typeof createDb.userId !== "number") {
        res.status(400).send("Silahkan memasukkan ID user yang sesuai")
    } else {
        db.push(createDb)
        res.send(req.body)
    }

    // if (createDb.name.length <= 1 && typeof createDb.name === "string") {
    //     res.status(400).send('Mohon isi name character string')
    //     return;
    // } else if (!Number(createDb.userId)) {
    //     res.status(400).send('Mohon isi  userId dengan angka')
    //     return;
    // } else {

    // }
})


module.exports = app