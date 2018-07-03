const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
var _ = require('lodash')
const User = require('./models/users')
const callback = require('./utilities/callback')










app.use(bodyParser())
const port = 3000;


app.use(passport.initialize());
app.use(passport.session())

require('./config/passport')(passport);

app.listen(port, () => {
  console.log("listening on port : " + port)
})


mongoose.connect(databaseConfig.database)
var db = mongoose.connection

db.on('error', console.error.bind(console, 'mongodb connection error'))



const users = require('./routes/users')
const lists = require('./routes/lists')
const boards = require('./routes/boards')

app.use('/users', users);
app.use('/users/boards', lists);
app.use('/users', boards)



// app.post('/', (req, res) => {
//   var user = req.body.user
//   let newUser = new User({
//     email: user.email,
//     password: user.password
//   });

//   User.addUser(newUser, (err, user) => {
//     if(err) {
//       res.json({success: false, msg: 'Failed to register user'});
//     } else {
//       res.json({success: true, msg: 'User registered'});
//     }
//   });
// })


// app.get('/user', (req, res) => {
//   User.getUserByEmail(req.query.email, (err, user) => {
//     if(err) {
//       console.log(err)
//       res.send("ERROR")
//     }
//     else {
//       console.log(user)
//       res.send(user)
//     }
//   })
// })


// app.post('/board', (req, res) => {
//   var board = req.body.board 
//   var email = req.body.email

//   User.addBoard(email,board, (err, user) => {
//     if(err) {
//       console.log(err)
//     }
//     else {
//       console.log(user)
//     }
//   })

// })

// app.post('/boards', (req, res) =>{
//   console.log(red.body.board)
// })



