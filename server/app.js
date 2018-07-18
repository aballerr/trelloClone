const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const cors = require('cors');


// 'mongodb://localhost:27018/trelloUsers',
var uri = "mongodb://mongo/dummy-app";

app.use(bodyParser())
app.use(cors())
const port = 3000;


app.use(passport.initialize());
app.use(passport.session())

require('./config/passport')(passport);

app.listen(port, () => {
  console.log("listening on port : " + port)
})


mongoose.connect(uri)
var db = mongoose.connection

db.on('error', console.error.bind(console, 'mongodb connection error'))



const users = require('./routes/users')
const lists = require('./routes/lists')
const boards = require('./routes/boards')

app.use('/users', users);
app.use('/users/boards', lists);
app.use('/users', boards)




