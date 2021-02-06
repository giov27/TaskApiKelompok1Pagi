const express = require("express")
const db = require("../db/dbFriends")
const app = express.Router()

// CRUD Friend
app.get("/friend", (req, res) => {
    res.send(db)
})

app.put('/friend/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })
    console.log(id);
    console.log(a);
    console.log(a.includes(id));
    if (a.includes(id) === false) {
        console.log("ini salah");
        res.status(400).send("salah memasukan id")
    } else {
        var index = db.map(function (friends) {
            return friends.id
        }).indexOf(id);
        db[index] = req.body
        res.send(req.body)
        console.log("ini benar");
    }
})

app.get("/friend/:id", (req, res) => {
    const id = req.params.id
    var index = db.map(function (friend) {
        return friend.id
    }).indexOf(Number(id));
    if (db[index] === undefined) {
        res.status(400).send("Data not found")
    } else {
        res.send(db[index])
    }
})

app.post("/friend", (req, res) => {
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