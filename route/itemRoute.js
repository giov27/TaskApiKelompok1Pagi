const express = require("express")
const app = express.Router()
const fs = require('fs')
const path = (`${__rootdir}/db.js`)

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
        console.log(err);
        res.status(400).send("Invalid username! \n Only letter and numbers are allowed. No spaces.");
    }
    const data = fs.readFileSync(path, 'utf8'); //change to string for the content because its array buffer if do not use the utf8
    db = data.replace('module.exports = ', '').trim();
    db = JSON.parse(db); //parse to JSON array
    if (db.length > 0 && db.find(item => item.username === username)) {
        res.json({
            'status': 'WARNING',
            'description': 'Username has been registered. Please input another username!'
        })
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