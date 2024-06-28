const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()
const User = require('../models/User');
const sequelize = require("../sq");

sequelize.sync()
    .then(() => {
        console.log('Database synced!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.end("hello")
})
app.get("/user", async (req, res) => {
    const { authenticated, id } = req.query
    if (authenticated === "true") {
        const authenticatedUsers = await User.findAll({
            where: {
                authenticated: true,
                id: id
            }
        })
        res.send(authenticatedUsers)
    } else if (authenticated === "false") {
        const authenticatedUsers = await User.findAll({
            where: {
                authenticated: false,
                id: id
            }
        })
        res.send(authenticatedUsers)
    } else {
        const users = await User.findAll()
        res.send(users)
    }
})

app.post('/user', async (req, res) => {
    const body = req.body
    const newUser = await User.create(body)
    res.send(newUser)
})

// app.listen(3000, () => console.log("server started"))

module.exports = app