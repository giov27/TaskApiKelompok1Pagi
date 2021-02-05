const { Router } = require("express")
const express = require("express")
const app = express()
const itemRoute = require('./route/itemRoute')

const port = 3000

//middleware 
app.use(express.json()) //bawaan express
app.use(itemRoute) //buat sendiri

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})