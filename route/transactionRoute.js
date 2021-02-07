<<<<<<< HEAD
const express = require("express")
const dbTransactions = require("../db/dbTransactions")
const db = require("../db/dbTransactions")
const app = express.Router()


// CRUD Transaction
app.get("/transaction", (req, res) => {
    res.send(db)
})

app.put('/transaction/:id', (req, res) => {
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
        res.status(400).send("salah memasukan id transaction")
    } else if (!Number(a.includes(id))) {
        res.status(400).send("Cannot update")
    } else {
        var index = db.map(function (transcation) {
            return transcation.id
        }).indexOf(id);
        db[index] = req.body
        res.send(req.body)
        console.log("ini benar");
    }
})

app.put("/transaction", (req, res) => {
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
app.delete('/Transaction/:id', (req, res) => {
    const id = Number(req.params.id)
    var a = [];
    db.forEach(function (obj) {
        a.push(obj.id);
    })
    
    if (a.includes(id) === false) {
        res.status(400).send("gagal delete, id tidak ditemukan")
    } else {
        var index = db.map(function (transactions) {
            return transactions.id
        }).indexOf(id);
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }
})

=======
const express = require("express")
const dbTransactions = require("../db/dbTransactions")
const db = require("../db/dbTransactions")
const app = express.Router()

// CRUD Transaction
app.get("/transaction", (req, res) => {
    res.send(db)
})

app.put('/transaction/:id', (req, res) => {
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
        res.status(400).send("salah memasukan id transaction")
    } else if (!Number(a.includes(id))) {
        res.status(400).send("Cannot update")
    } else {
        var index = db.map(function (transcation) {
            return transcation.id
        }).indexOf(id);
        db[index] = req.body
        res.send(req.body)
        console.log("ini benar");
    }
})

app.put("/transaction", (req, res) => {
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

// app.get("/transaction", (req, res) => {
//     res.send(db)
// })

// app.get("/transaction/:id", (req, res) => {
//     const id = req.params.id
//     var index = db.map(function (transaction) {
//         return transaction.id
//     }).indexOf(Number(id));
//     if (db[index] === undefined) {
//         res.status(400).send("Data not found")
//     } else {
//         res.send(db[index])
//     }
// })
// app.post("/transaction", (req, res) => {
//     const createDb = {
//         id: db.length + 1,
//         userId: req.body.userId,
//         friendId: req.body.freindId,
//         itemId: req.body.itemId,
//         nominal: req.body.nominal
//     }
//     // if (!req.body.name || req.body.name.length < 3) {
//     //     res.status(400).send('Mohon isi name lebih dari 3 character')
//     //     return;
//     if ((!req.body.userId || req.body.userId.length < 3)) {
//         res.status(400).send('Mohon isi  userId lebih dari 3 character')
//         return;
//     } else if ((!req.body.friendId || req.body.friendId.length < 3)) {
//         res.status(400).send('Mohon isi  friendId lebih dari 3 character')
//         return;
//     } else if ((!req.body.itemId || req.body.itemId.length < 3)) {
//         res.status(400).send('Mohon isi  itemId lebih dari 3 character')
//         return;
//     } else if ((!Number(req.body.itemId))) {
//         res.status(400).send('Mohon isi dengan angka')
//         return;
//     } else {
//         db.push(createDb)
//         res.send(req.body)
//     }
// })

>>>>>>> 3c1b3d425a7707735b4d79329148fdda0f51886f
module.exports = app