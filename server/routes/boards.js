const express = require('express')
const router = express.Router();
const Board = require('../models/boards')
const passport = require('passport')


router.post('/boards', passport.authenticate('jwt', { session: false }), (req, res, next) => {
 

    Board.addBoard(req, (err, response) => {
        if (err) {
            res.send({ error: err })
        }
        else {
            res.send({ response: response })
        }
    });
})


router.delete('/boards', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    
    Board.deleteBoard(req, (err, response) => {
        if(err) {
            res.send({error: err})
        }
        else {
            res.send({response: response})
        }
    })
})


router.get('/boards', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Board.getAllBoards(req, (err, boards) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({result: boards})
        }
    })
})


router.get('/boards/:boardID', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Board.getBoardById(req, (err, user) => {
        if(err){
            console.log(err)
            res.send({error: err})
        } 
        else {
            res.send({result:user})
        }
    })
})

router.put('/boards', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Board.updateBoardName(req, (err, response) => {
        if(err) {
            res.send({error: err})
        }
        else {
            res.send({response: response})
        }
    })
})

module.exports = router;