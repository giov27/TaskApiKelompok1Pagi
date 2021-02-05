const { Router } = require("express")
const express = require("express")
const app = express()
app.use(express.json())

const rootRoute = require('./route/rootRoute')
const itemRoute = require('./route/itemRoute')
const friendRoute = require('./route/friendRoute')
const transactionRoute = require('./route/transactionRoute')

app.use(rootRoute, itemRoute, friendRoute, transactionRoute)

const port = 3000
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})  