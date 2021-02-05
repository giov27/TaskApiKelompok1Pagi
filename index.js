const express = require("express")
const app = express()
const itemRoute = require("./route/itemRoute")
const friendRoute = require("./route/friendRoute")
const transactionRoute = require("./route/transactionRoute")

app.use(express.json())
app.use(itemRoute)
app.use(friendRoute)
app.use(transactionRoute)
app.use((req, res, next) => {
    res.status(404)
    res.send("404 Page Not Found")
})

const port = 3000
app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
})