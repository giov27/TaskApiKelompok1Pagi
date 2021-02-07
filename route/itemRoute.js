const express = require("express")
const db = require("../db/dbItems")
const dbUser = require("../db/dbRegister")
const app = express.Router()
const validation = require('../function/function')

// CRUD Item
app.get("/:user/item", (req, res) => {
    const user = Number(req.params.user)
    const find = dbUser.find(item => item.id === user)
    var elem = []
    validation.valid(find, user, elem, db)
    console.log('elem:', elem);
    // console.log('ini send: ', send);
    res.send(elem)
})
//validating id
// function valid(find, user, elem) {
//     if (find === undefined) {
//         console.log("idmu ga ada");
//     } else {
//         db.forEach(element => {
//             // console.log('element:', element);
//             if (element.userId === user) {
//                 elem.push(element)
//                 return elem;
//             }
//         });
//     }
// }

app.put('/item/:id', (req, res) => {
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
        res.status(400).send("salah memasukan id item")
    } else if (!Number(a.includes(id))) {
        res.status(400).send("Cannot update")
    } else {
        var index = db.map(function (item) {
            return item.id
        }).indexOf(id);
        db[index] = req.body
        res.send(req.body)
        console.log("ini benar");
    }
})

app.post("/item", (req, res) => {
    const createDb = {
        id: db.length,
        userId: req.body.userId,
        name: req.body.name
    }
    if (!db.length || db.length < 1) {
        res.status(400).send('Mohon isi id dengan benar')
        return;
    } else if ((!req.body.userId || req.body.userId < 1)) {
        res.status(400).send('Mohon isi id dengan benar')
        return;
    } else {
        db.put(createDb)
        res.send(req.body)
    }
})

//delete Transaction
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
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }
})

module.exports = app