const express = require("express")
const db = require("../dbRegister")
const app = express.Router()
const fs = require('fs')
const path = (`${__rootdir}/db.js`)
console.log(__rootdir);

// Get the User's Data in DB
app.get('/user_list', (req, res) => {
    res.send(`Total user: ${db.length}`)
});

//Register Feature
app.post('/register', (req, res) => {
    const {
        id,
        username,
        password
    } = req.body
    let db;
    try {
        db = require(path);
    } catch (err) {
        db = fs.readFileSync(path);
        db = db.replace('module.exports = ', '');
        db = JSON.parse(db);
    }
    console.log(db);
    if (db.length === 0) {
        db.push({
            id,
            username,
            password
        })
        console.log(db);
        fs.writeFileSync(path, JSON.stringify(`module.exports = ${JSON.stringify(db)}`))
        res.json({
            'status': 'OK',
            'description': 'Akun berhasil didaftarkan'
        })
    } else if (db.length > 0 && db.find(item => item.username === username)) {
        res.json({
            'status': 'WARNING',
            'description': 'Username sudah terdaftar. Silakan gunakan username lain'
        })
    } else {
        db.push({
            id,
            username,
            password
        });
        fs.writeFileSync(path, JSON.stringify(`module.exports = ${JSON.stringify(db)}`));
        res.json({
            'status': 'OK',
            'description': 'Username berhasil ditambahkan',
        })
    }
});
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

//Login feature
app.post('/auth', (req, res) => {
    const {
        username,
        password
    } = req.body
    console.log(db.find(item => item === username));
    if (username.length > 0 && db.find(item => item.username === username)) {
        const index = db.findIndex(item => item.username === username)
        // console.log(index);
        if (db[index].password === password) {
            res.send(`Hello ${username}, you will be redirect to home`)
        } else {
            res.status(400).send("Your password is incorrect")
        }
    } else if (username.length > 0) {
        res.status(400).send("Your username & password are incorrect")
    } else {
        res.status(400).send("Please input your username")
    }
})

module.exports = app