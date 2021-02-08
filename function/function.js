const path = (`${__rootdir}/db/dbAuth.js`)
const express = require("express")
const app = express.Router()
// fs = file system (modul)
const fs = require('fs')

function valid(find, user, elem, db) {
    if (find === undefined) {
        console.log("idmu ga ada");
    } else {
        db.forEach(element => {
            // console.log('element:', element);
            if (element.userId === user) {
                elem.push(element)
                return elem;
            }
        });
    }
}

function validateLetter(username) {
    let textInput = username;
    var replacedInput = textInput.replace(/[^A-Za-z0-9]/g, "");
    if (textInput != replacedInput) {
        throw "Username tidak valid! \n Hanya menerima huruf dan angka tanpa spasi.";
    } else {
        return username;
    }
}


module.exports = { valid, validateLetter }