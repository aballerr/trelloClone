const express = require('express')
const router = express.Router();
const User = require('../models/users')
const Board = require('../models/boards')
const List = require('../models/lists')
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const passport = require('passport')
var _ = require('lodash')




router.post('/lists', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    var boardID = req.body.boardID

    let newList = new List({
        listName: req.body.listName
    });


    List.addList(newList, (err, list) => {
        if (err) {
            console.log(err)
            res.send({ error: err })
        }
        else {
            Board.addList(boardID, list, {}, (err, board) => {
                if (err) {
                    console.log(err)
                    res.send({ error: err })
                }
                else {
                    // console.log(board)
                    // res.send({response: board})
                    //console.log(board)
                    console.log(board)

                    for(var i in req.user.boards){
                        if(req.user.boards[i]._id == boardID){
                            var temp = req.user.toObject().boards;
                            req.user.boards = []
                            
                            req.user.boards.push(board)
                            console.log(req.user.boards)
                            console.log("does this work")
                            
                            
                        }
                    }
                   // console.log(req.user.boards)
                   // console.log(req.user)

                    req.user.save((err, success) => {
                        if(err){
                            console.log(err)
                        }
                        else {
                         
                            res.send({success: success})
                        }
                    })



                    // for(var i in req.users.boards){
                    //     req.users.boards[i].lists.push("lad")
                    // }
                    // req.users.save((err, success) => {
                    //     if(err){
                    //         console.log(err)
                    //         res.send({err: err})
                    //     }
                    //     else {
                    //         res.send({response: success})
                    //     }
                    // })
                    
             
                }
            })
        }
    })

})



/**
 * boardID
 * listID
 * listName
 */

router.put('/lists', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var listID = req.body.listID, newListName = req.body.newListName, boardID = req.body.boardID;

    List.updateListName(listID, newListName, {}, (err, updatedList) => {
        if(err){

            console.log(err)
            res.send({error: err})
        }
        else {

            console.log(updatedList)
            res.send({response: updatedList})
        }
    })
})


router.get('/lists/:listID', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    var listID = req.params.listID 

    List.getList(listID, (err, list) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({response: list})
        }
    })
})



/**
 * @param {query} - 
 */
router.get('/lists', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(req.query.boardID){

    }
    else {
        var lists = []

        console.log(req.user.boards)

    }
})




module.exports = router;