const { response } = require("express")
const express = require("express")
const db = require("../db")
const app = express.Router()

// Get the User's Data in DB
app.get('/', (req, res) => {
    res.send(db)
});

app.post('/auth', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // console.log(username);
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