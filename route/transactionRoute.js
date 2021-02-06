const express = require("express")
const dbTransactions = require("../db/dbTransactions")
const db = require("../db/dbTransactions")
const app = express.Router()


// put Transaction
app.put('/Transaction/:id', (req, res) => {
    db[req.params.index] = req.body
    res.send(req.body)
})

//delete Transaction
app.delete('/Transaction/:index', (req, res) => {
    const index = req.params.index 
    if((dbTransactions.length-1) < index){
        res.status(404).send('data tidak ada pada sistem')
    }
    else{
        const deletedItem = db.splice(index, 1)
        res.send(deletedItem)
    }
})

module.exports = app