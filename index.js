const express = require("express")
const app = express()

const itemRoute = require('./route/itemRoute'); //import the route file

// Define the middleware for the extended functionality in express
app.use(express.json());
app.use(itemRoute);

const port = 3000
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})