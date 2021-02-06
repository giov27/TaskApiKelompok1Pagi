const express = require("express")
const app = express()
const itemRoute = require('./route/itemRoute')

//middleware
app.use(express.json()) 
app.use(itemRoute)
app.use(function(error, req, res, next) {
    //console.log(error);
    res.send(error.message)
})

const port = 3000
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
    
})