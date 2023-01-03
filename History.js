const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./controllers/queries')

cookieParser = require('cookie-parser')
const port = 3001


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cookieParser('secret key'))

// app.get('/', (req, res) => {
//     response.json({info: 'Node.js, Express, and Postgres API'})
// })

app.get('/cook', (req, res) => {
    res.cookie('token', '12345ABCDE')
    res.send('Set Cookie-установили')
})
app.get('/cook', (req, res) => {
    console.log('Cookie: ', req.cookies)
    res.send('Get Cookie-ПРИНЯЛИ КУКИ')
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)
app.get('/nom/:id', db.getQuestion)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

