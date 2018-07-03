const mongoose = require('mongoose')
const config = require('../config/database')


/**
 * TODO: need a put request to update the name of a board
 */



const BoardSchema = mongoose.Schema({
  boardName: {
    type: String,
    required: true
  },
  lists: {
    type: Array,
    default: []
  }
})





const Board = module.exports = mongoose.model('Board', BoardSchema)



/**
 * adds a board to both the boards collection in mongo and a board to the current user lists of boards
 * @param {mogoose board schema} board 
 * @param {*} callback 
 */
module.exports.addBoard = function (board, callback) {
  board.save(callback)
}



/**
 * pass in a board object with the id of the board you would like to remove
 * @param {object} user 
 * @param {object} boardToRemove - {board: _id}
 * @param {function} callback 
 */
module.exports.deleteBoard = function (user, boardToRemove, callback) {


  Board.find({ _id: boardToRemove._id }).remove((err, success) => {
    var boards = user.toObject().boards
    if (err) {
      callback(err, "");
    }
    else {
      var board;
      for (var i in boards) {
        board = boards[i]
        if (board == boardToRemove._id) {
          boards = boards.splice(1, i);
        }
      }
      user.boards = boards;
      user.save(callback)
    }
  })
}


module.exports.updateBoardName = function (boardName, boardID, options, callback) {
  var query = { _id: boardID }

  Board.findOneAndUpdate(query, { $set: { boardName: boardName } }, options, callback)
}


module.exports.addList = function (boardID, list, options,  callback) {
  var query = { _id: boardID }

  Board.findOneAndUpdate(query, { $push: { lists: list } }, options, (err, success) => {
    if(err){
      callback(err, null)
    }
    else {
      Board.find(query, callback)
    }
  })

}


module.exports.getBoard