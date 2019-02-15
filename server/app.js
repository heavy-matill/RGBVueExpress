var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/RGB').then(
  () => { console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database'+ err)}
)
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 4000

app.listen(() => {
  console.log('Listening on port ' + port)
})

module.exports = app
