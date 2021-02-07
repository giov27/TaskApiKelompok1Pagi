global.__rootdir = __dirname;
const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const itemRoute = require('./route/itemRoute'); //import the route file

// Define the middleware for the extended functionality in express
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(itemRoute);

const port = 3000

//middleware 
app.use(express.json()) //bawaan express
app.use(itemRoute) //buat sendiri

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})