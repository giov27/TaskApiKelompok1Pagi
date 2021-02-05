const { Router } = require("express")
const express = require("express")
const app = express()
// const itemRoute = require('./route/')

const port = 3000
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})