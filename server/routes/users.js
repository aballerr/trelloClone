const express = require('express')
const router = express.Router();
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const passport = require('passport')
var _ = require('lodash')


router.post('/signup', (req, res) => {
  var user = req.body.user
  console.log(user)
  console.log(req.body)
  let newUser = new User({
    email: user.email,
    password: user.password
  });


  User.addUser(newUser, (err, user) => {
    if (err) {
      console.log(err)
      res.json({
        success: false,
        msg: 'Failed to register user'
      });
    } else {
      res.json({
        success: true,
        msg: 'User registered'
      });
    }
  });
})


router.post('/authenticate', (req, res, next) => {
  var user = req.body.user
  const email = user.email;
  const password = user.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.json({
        success: false,
        msg: "User not found"
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign(user.toObject(), config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});


router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  var user = _.omit(req.user.toObject(), 'password');

  res.json({ user: user })
});

module.exports = router;