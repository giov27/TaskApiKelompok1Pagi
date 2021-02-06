const express = require("express")
const dbFriends = require("../db/dbFriends")
const app = express.Router()

// CRUD Friend
// app.put('/friend/:id', (req, res) => {
//     db[req.params.id] = req.body
//     res.send(req.body)
// })
app.get('/friendlist', (req, res) => {
    res.send(dbFriends)
});

app.put('/friend/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    dbFriends.forEach(function (obj) {
        a.push(obj.id);
    })
    console.log(id);
    console.log(a);
    console.log(a.includes(id));
    if (a.includes(id) === false) {
        console.log("ini salah");
        res.status(400).send("salah memasukan id")
    } else {
        var index = dbFriends.map(function (friends) {
            return friends.id
        }).indexOf(id);
        dbFriends[index] = req.body
        res.send(req.body)
        console.log("ini benar");
    }
})

module.exports = app