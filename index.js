const { Router } = require("express")
const express = require("express")
const app = express()
// const itemRoute = require('./route/')

app.use(express.json())
const itemRoute = require("./route/itemRoute")
const friendRoute = require("./route/friendRoute")
const transactionRoute = require("./route/transactionRoute")


app.use(itemRoute, friendRoute, transactionRoute)

app.use(function (eror, req, res, next) {
    console.log(eror)
    res.status(500).send(eror.message)
})

const port = 3000
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})