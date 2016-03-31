var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://128.199.215.170:27017/db1';
var currentDb;

// Connect using MongoClient
function connectDb(callback){
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    currentDb = db;
    callback(null, db);
  });
}

function getDb(){
  return currentDb;
}

exports.connectDb = connectDb;
exports.getDb = getDb;
