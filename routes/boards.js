const express = require('express')
const router = express.Router();
const User = require('../models/users')
const Board = require('../models/boards')
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const passport = require('passport')
var _ = require('lodash')




router.post('/boards', passport.authenticate('jwt', { session: false }), (req, res, next) => {


    const boardName = req.body.boardName;
    let newBoard = new Board({
        boardName: boardName
    });

    Board.addBoard(newBoard, (err, board) => {
        if (err) {
            console.log(err)
            res.send({ err: err })
        }
        else {
            req.user.boards.push(board)
            req.user.save((err, user) => {
                if (err) {
                    console.log(err)
                    res.send({ error: err })
                }
                else {
                    console.log(user);
                    res.send({ user: user })
                }
            })
        }
    })
})




router.delete('/boards', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var board = req.body.board


    Board.deleteBoard(req.user, board, (err, success) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({success: success})
        }
    })
})


router.get('/boards', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var boards = req.user.toObject().boards;

    res.send({boards: boards})
})



/**
 * boardId - the unique boardID given by mongo.  We search through the users boards so that people can't request a board
 * that does not belong to them
 */
router.get('/boards/:boardID', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var boards = req.user.toObject().boards;
    var boardID = req.params.boardID

    for(var i in boards){  
        if(boards[i]._id == boardID) {
            res.send({board: boards[i]})
        }
    }
    res.send({response: "board not found"})
})

router.put('/boards', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    

    Board.updateBoardName(req.body.boardName, req.body.boardID, {}, (err, data) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            var boards = req.user.toObject().boards;

            for(var i in boards){
                if(boards[i]._id == req.body.boardID){
                    boards[i].boardName = req.body.boardName
                }
            }
            
            req.user.boards = boards;
            req.user.save((err, user) => {
                if(err) {
                    console.log(err)
                    res.send({error: err})
                }
                else {
                    console.log(user)
                    res.send({response: user})
                }
            })
        }
    })
})

module.exports = router;