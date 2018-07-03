const mongoose = require('mongoose')
const config = require('../config/database')



const ListSchema = mongoose.Schema ({
    listName: {
      type: String,
      required: true 
    },
    items: {
      type: Array,
      default: []
    }
  })





  const List = module.exports = mongoose.model('List', ListSchema)




  module.exports.addList = function (List, callback) {
    List.save(callback)
  }

  module.exports.updateListName = function(listID, newListName, options, callback){
    var query = { _id: listID }

    List.findOneAndUpdate(query, { $set: { listName: newListName } },{}, callback)
  }


  module.exports.getList = function(listID, callback) {
      var query = { _id: listID }
      
      List.findOne(query, callback)
  }

