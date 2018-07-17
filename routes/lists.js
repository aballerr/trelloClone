const express = require('express')
const router = express.Router();
const List = require('../models/lists')
const passport = require('passport')



router.post('/lists', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    List.addList(req, (err, success) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({response: success})
        }
    })
})


router.put('/lists', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    List.updateList(req, (err, success) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({response: success})
        }
    })
})


router.get('/lists/:listID', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    List.getList(req, (err, success) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({response: success})
        }
    })
})


router.get('/lists', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    List.getLists(req, (err, success) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({response: success})
        }
    })
})


router.delete('/lists', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    List.deleteList(req, (err, success) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({response: success})
        }
    })
})


module.exports = router;