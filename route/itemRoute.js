const express = require("express")
const app = express.Router()
const fs = require('fs')
const path = (`${__rootdir}/db.js`)
console.log(__rootdir);

// Get the User's Data in DB
app.get('/', (req, res) => {
    res.send(db)
});

// User Register Function
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

// User Login Function
app.post('/login', (req, res) => {
    db.push(req.body);
    res.send(req.body)
});

module.exports = app