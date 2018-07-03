/**
 * I found myself using a lot of the same callbacks, so I decided to just
 * make a file that contains all these callbacks instead of constantly duplicating
 * code
 */




 module.exports = {


    mongoDBResponse : (err, response) => {
        if(err){
            console.log(err)
            res.send({error: err})
        }
        else {
            res.send({response: response})
            console.log(response)
        }
    },

    test: function(){
        console.log("workin")
    }
 
 }