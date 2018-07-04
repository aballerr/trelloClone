const mongoose = require('mongoose')
const config = require('../config/database')
const User = require('./users')


/**
 * TODO: need a put request to update the name of a board
 */





module.exports.addBoard = function (req, callback) {
  var user = req.user;
  var boardName = req.body.boardName;
  var boardID = user.nextBoardID;

  var newBoard = {
    boardID: boardID,
    boardName: boardName,
    lists: [],
    nextListID: 1 
  }

  req.user.boards.push(newBoard)
  req.user.save((err, success) => {
    if (err) {
      callback(err, null)
    }
    else {
      User.getNextBoardID(user, callback)
    }
  })

}


//db.users.update({email: "aball1997@gmai.com"}, {$pull: {boards: {boardID: 1}}});

module.exports.deleteBoard = function (req, callback) {
  var boardID = parseInt(req.body.boardID)
  var query = { _id: req.user._id }
  var update = {$pull: {boards: {boardID: boardID}}}

  User.findOneAndUpdate(query, update, null,  callback)
}


module.exports.updateBoardName = function (req, callback) {
  var query = ({"_id": req.user._id},{boards: {$elemMatch: {boardID: parseInt(req.body.boardID)}}})


  User.findOne(query, (err, user) => {
    if(err){
      console.log(err)
    }
    else {
      
      for(var i in user.boards){
        if(user.boards[i].boardID == req.body.boardID) {
          user.boards[i].boardName = req.body.boardName
        }
      }
      user.markModified('boards')
      user.save(callback)
    }
  })
}



  //var query = ({"_id": req.user._id},{boards: {$elemMatch: {boardID:boardID}}})
module.exports.getBoardById = function(req, callback) {
  var boardID = parseInt(req.params.boardID)
  var boards = req.user.toObject().boards;
  var board;

  for(var i in boards){boardID
    if (boards[i].boardID == boardID){
      board = boards[i]
    }
  }

  if(board == undefined){
    callback(null, "board does not exist")
  }
  else {
    callback(null, board)
  }
}



module.exports.getAllBoards = function(req, callback) {
  var boards = req.user.boards;

  callback(null, boards)

}