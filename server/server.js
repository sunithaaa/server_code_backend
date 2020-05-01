var express = require('express')

var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'mongodb://localhost:27017/login_demo'

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

var Users = require('./models/Users')

app.use('/user', User)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})