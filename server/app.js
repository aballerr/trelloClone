const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const cors = require('cors');
const path = require('path');
const port = 3000;
const prod = process.argv[2];
const database = prod === 'true' ? databaseConfig.dockerDatabase : databaseConfig.database;

//Initializing Middleware
app.use(bodyParser())
app.use(cors())
app.use(passport.initialize());
app.use(passport.session())
require('./config/passport')(passport);


// Defined Routes
const users = require('./routes/users')
const lists = require('./routes/lists')
const boards = require('./routes/boards')

app.use('/users', users);
app.use('/users/boards', lists);
app.use('/users', boards)

//Connection to MongoDB
mongoose.connect(database)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error'))


//For production
if (prod) {
  app.use(express.static(path.join(__dirname, './public')));

  app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'));
  });
}

app.listen(port, () => {
  console.log("listening on port : " + port)
})









