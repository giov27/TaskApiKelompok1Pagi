global.__rootdir = __dirname;
const express = require("express")
const app = express()
const bodyParser = require('body-parser'); //import the route file

//route
const authRoute = require('./route/authRoute'); //import the route file
const rootRoute = require('./route/rootRoute')
const itemRoute = require('./route/itemRoute')
const friendRoute = require('./route/friendRoute')
const transactionRoute = require('./route/transactionRoute')

//Port
const port = 3000

// Define the middleware for the extended functionality in express
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(rootRoute, itemRoute, friendRoute, transactionRoute, authRoute)

//Handle error
app.use(function (eror, req, res, next) {
    console.log(eror)
    res.status(500).send(eror.message)
})

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})  