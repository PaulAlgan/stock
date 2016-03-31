var Google = require('../../adapters/google.js');
var tick1d = require('../../collections/tick1dCollection.js');


module.exports = function(app){

  app.get('/stock', function(req, res){
    var params = req.query;
    var symbol = params.symbol;

    Google.getStockHistory(symbol, 2, function(err, result){
      insertToDB(result);
      res.send(result);
    });
  });
}

function insertToDB(ticks){

  ticks.forEach(function(tick){

    // CHECK DUPICATE
    
    tick1d.insert([ tick ], function(err, result){

    });


  });
}
