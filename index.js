global.__rootdir = __dirname;
const express = require("express")
const app = express()
const bodyParser = require('body-parser'); //import the route file


// Define the middleware for the extended functionality in express
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
const itemRoute = require('./route/userAuth');
app.use(itemRoute);

const port = 3000
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})