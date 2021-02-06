const express = require("express")
const app = express()

//route
const loginRegister = require('./route/registerRoute'); //import the route file
const rootRoute = require('./route/rootRoute')
const itemRoute = require('./route/itemRoute')
const friendRoute = require('./route/friendRoute')
const transactionRoute = require('./route/transactionRoute')
//Port
const port = 3000

// Define the middleware for the extended functionality in express
app.use(express.json());
app.use(rootRoute, itemRoute, friendRoute, transactionRoute, loginRegister)

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})  