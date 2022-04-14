require('dotenv').config()
    // require('./config/db.js')
const express = require('express')
const bodyParser = require('body-parser')
    // const api = require('./routes/userApi')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.get('/', (req, res) => {
    res.send("text")
})
app.use(bodyParser.json())

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})

// app.use('/api', api)