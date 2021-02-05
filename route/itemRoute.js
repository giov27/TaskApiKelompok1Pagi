const { response } = require("express")
const express = require("express")
const db = require("../db")
const app = express.Router()

app.get('/', (req, res) => {
    console.log(db[0])
    res.send(db)
})

//login feature
app.post('/auth', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    let dbId = db.length - 1
    // console.log(username, password);
    console.log(dbId);
    while (username.length > 0) {
        if (db[dbId].username == username && db[dbId].password == password) {
            res.send(`Hello ${username}, you will be redirect to home`)
            break
        } else {
            dbId -= 1
            if (dbId < 0) {
                res.send('Your username & password are incorrect')
                break
            }
        }

    }
    res.send('Please input your username')
})


// Get the User's Data in DB
app.get('/', (req, res) => {
    res.send(db)
});

// User Register Function
app.post('/register', (req, res) => {
    db.push(req.body);
    res.send(req.body)
});

// User Login Function
app.post('/login', (req, res) => {
    db.push(req.body);
    res.send(req.body)
});

module.exports = app