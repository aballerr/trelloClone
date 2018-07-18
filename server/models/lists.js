const mongoose = require('mongoose')
const config = require('../config/database')


module.exports.addList = function (req, callback) {
    var user = req.user;
    var boards = user.boards;
    var boardID = req.body.boardID
    var listName = req.body.listName;
    var items = req.body.items

    for (var i in boards) {
        if (boards[i].boardID == boardID) {
            var board = boards[i]
            var newList = {
                listName: listName,
                listID: board.nextListID++,
                items: items == undefined ? [] : items
            }
            board.lists.push(newList)
        }
    }

    user.markModified('boards')
    user.save(callback)
}


module.exports.updateList = function (req, callback) {
    var list = req.body.list;
    var listID = list.listID;
    var boardID = req.body.boardID;
    var boards = req.user.boards

    for (var i in boards) {

        if (boards[i].boardID == boardID) {
            var lists = boards[i].lists;
            for (var j in lists) {
                if (lists[j].listID == listID) {
                    lists[j].listName = list.listName;
                    lists[j].items = list.items;
                }
            }
        }
    }

    req.user.markModified('boards')
    req.user.save(callback)
}


module.exports.getList = function (req, callback) {
    var boards = req.user.boards;
    var listID = req.params.listID;
    var boardID = req.query.boardID;
    var list;

    for (var i in boards) {
        if (boards[i].boardID == boardID) {
            var lists = boards[i].lists;
            for (var j in lists) {
                if (lists[j].listID == listID) {
                    list = list[j]
                    callback(null, list)
                }
            }
        }
    }

    if (list == undefined) {
        callback("USER NOT FOUND", null)
    }
}


module.exports.getLists = function (req, callback) {
    var boardID = req.query.boardID;
    var boards = req.user.boards;
    var board;

    for (var i in boards) {
        if (boards[i].boardID == boardID) {
            board = boards[i]
        }
    }

    if (board == undefined) {
        callback("board does not exist", null)
    }
    else {
        callback(null, board.lists)
    }
}


module.exports.deleteList = function (req, callback) {
    var boardID = req.body.boardID;
    var listID = req.body.listID;
    var boards = req.user.boards;
    var lists, success = false;


    for (var i in boards) {
        if (boards[i].boardID == boardID) {
            lists = boards[i].lists;

            for (var j in lists) {


                if (lists[j].listID == listID) {
                    lists.splice(j, 1)
                }
            }
        }
    }

    req.user.markModified('boards')
    req.user.save(callback)
}
