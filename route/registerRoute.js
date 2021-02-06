const { response } = require("express")
const express = require("express")
const db = require("../db/dbRegister")
const app = express.Router()

// Get the User's Data in DB
app.get('/user_list', (req, res) => {
    res.send(`Total user: ${db.length}`)
});

//Register Feature
app.post('/register', (req, res) => {
    const {
        username,
        password
    } = req.body
    // const forbiddenChar = "@", "+", "{", "}", "?"
    const splitstring = username.split("")
    console.log(splitstring.includes('@') === false);
    if (username.length > 0 && splitstring.includes('@') === false) {
        db.push(req.body)
        db[db.length - 1].id = db.length
        res.send(req.body)
    } else {
        res.send("username can't use")
    }
})

//Login feature
app.post('/auth', (req, res) => {
    const {
        username,
        password
    } = req.body
    // const username = req.body.username
    // const password = req.body.password
    console.log(db.find(item => item.username === username));
    if (username.length > 0 && db.find(item => item.username === username)) {
        const index = db.findIndex(item => item.username === username)
        // console.log(index);
        if (db[index].password === password) {
            res.send(`Hello ${username}, you will be redirect to home`)
        } else {
            res.send(`Your password is incorrect`)
        }
    } else if (username.length > 0) {
        res.send('Your username & password are incorrect')
    } else {
        res.send('Please input your username')
    }
})

module.exports = app