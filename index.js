var express = require('express');

var MongoDB = require('./adapters/mongo.js');

var app = express();


MongoDB.connectDb(function(err, db){
  if (err) {
    console.log('Cannot connect MongoDB:', err);
  }
  else{
    startServer();
  }
});


function startServer(){

  require('./route')(app);

  app.listen(3000);
}
