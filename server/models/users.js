const mongoose = require('mongoose')
const config = require('../config/database')
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  boards: {
    type: Array,
    default: []
  },
  nextBoardID: {
    type: Number,
    default: 1
  }
})
const User = module.exports = mongoose.model('User', UserSchema)


module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}


module.exports.getUserByEmail = function (email, callback) {
  const query = {
    email: email
  }
  User.findOne(query, callback)
}


module.exports.getUserByName = function (name, callback) {
  const query = {
    name: name
  }
  User.find(name, callback)
}


module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}


module.exports.update = function(boardID, callback){

}


module.exports.update = function(query, update, callback){
  User.findOneAndUpdate(query, update, (err,success) => {
    callback(err, success)
  })
}


module.exports.getNextBoardID = function(user, callback) {

  user.nextBoardID = user.nextBoardID + 1
  user.save(callback)
}