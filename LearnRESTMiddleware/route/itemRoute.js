const express = require("express")
const db = require("../db")
const app = express.Router()

app.get('/error', (req, res) => {
    inierorcakk
})

app.get('/item/:index', (req, res) => {
    res.send(db[req.params.index])
})

app.get('/item/', (req, res) => {
    res.send(db)
})

/*menghandle rute post, mau nambah data ke postman*/
app.post('/item/', (req, res) => {
    //console.log(req.body);
    db.push(req.body)
    res.send(req.body)
})

app.put('/item/:index', (req, res) => {
    const index = req.params.index
    if(!Number(index)){
        res.status(404).send('masukin nomor yaa')
    }
    else if((db.length -1) < index){
        res.status(404).send('index not found in the array')
    }
    else{
        db[req.params.index = req.body] //mengisi db pada sistem dari db inputan postman
        res.send(req.body) //mengembalikan data yang sudah diedit
    }
    
})

app.deleteitem/('/:index', (req, res) => {
    const index = req.params.index
    const deletedItem = db.splice(index, 1)
    res.send(deletedItem)
})

module.exports = app