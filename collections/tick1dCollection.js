var MongoDb = require('../adapters/mongo.js').getDb();
var tick1d = MongoDb.collection('tick1d');

module.exports = tick1d;
