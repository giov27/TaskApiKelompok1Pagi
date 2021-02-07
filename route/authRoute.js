const express = require("express")
const app = express.Router()
const fs = require('fs')
const path = (`${__rootdir}/db/db.js`)
const dbLogin = require('../db/db')
// const validateWord = require('../function/function')

// Get the User's Data in DB
app.get('/user_list', (req, res) => {
    let data = fs.readFileSync(path, 'utf8');
    data = data.replace('module.exports = ', '').trim();
    data = JSON.parse(data);
    res.json(data);
});

//Register Feature
app.post('/register', (req, res) => {
    const {
        username,
        password
    } = req.body
    let db;
    try {
        validateLetter(username);
    } catch (err) {
        // console.log(err);
        res.status(400).send("Invalid username! \n Only letter and numbers are allowed. No spaces.");
    }
    const data = fs.readFileSync(path, 'utf8'); //change to string for the content because its array buffer if do not use the utf8
    db = data.replace('module.exports = ', '').trim();
    db = JSON.parse(db); //parse to JSON array
    if (db.length > 0 && db.find(item => item.username === username)) {
        res.status(400).send("Warning! \n Username has been registered. Please input another username!")
    } else {
        db.push({
            id: db.length + 1,
            username,
            password
        });
        fs.writeFileSync(path, `module.exports = ${JSON.stringify(db)}`);
        res.json({
            'status': 'OK',
            'description': 'Username has been added!',
        })
    }
});

// Checking the character of username input
function validateLetter(username) {
    let textInput = username;
    var replacedInput = textInput.replace(/[^A-Za-z0-9]/g, "");
    if (textInput != replacedInput) {
        throw NonMatchError;
    } else {
        return username;
    }
}

//Login feature
app.post('/auth', (req, res) => {
    const {
        username,
        password
    } = req.body
    if (username.length > 0 && dbLogin.find(item => item.username === username)) {
        const index = dbLogin.findIndex(item => item.username === username)
        // console.log(index);
        if (dbLogin[index].password === password) {
            res.send(`Hello ${username}, \n Click to see: \n Items : http://localhost:3000/item/${dbLogin[index].id} \n Friends: http://localhost:3000/friend/${dbLogin[index].id} `)
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