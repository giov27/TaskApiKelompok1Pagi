const express = require("express")
const dbFriends = require("../db/dbFriends")
const db = require("../db/dbFriends")
const app = express.Router()

// put Friend
app.put('/friend/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

//delete Friend
app.delete('/friend/:index', (req, res) => {
    const index = req.params.index
    if((dbFriends.length-1) < index){
        res.status(404).send('data tidak ada pada sistem')
    }
    else{
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }
    
})

module.exports = app