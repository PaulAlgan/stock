var request = require('request');
var moment = require('moment');

function getStockHistory(symbol, day, callback){
  // var url = 'https://www.google.com/finance/getprices?q='+symbol+'&x=BKK&p='+day+'d&f=d,c,h,l,o,v';
  var url = 'https://www.google.com/finance/getprices?q='+symbol+'&x=BKK&p='+day+'d&f=d,c,h,l,o,v&i=60';
  console.log(url);
  request(url , function (err, response, body) {
    if (err) return callback(err);

    var ticks = convertToTickData(body, symbol);
    callback(null, ticks);
  })
}


function convertToTickData(text, symbol){
  var array = text.split('\n');
  var tickArray = array.slice(8,array.length-1);
  var colName = array[4].split('=')[1];
  var intervalRow = array[3];
  var columnArray = colName.split(',');
  var interval = Number(intervalRow.split('=')[1]);
  // console.log(columnArray);
  var firstColumn = tickArray[0].split(',');
  var baseTime = 0;

  var results = [];
  for (var i = 0; i < tickArray.length; i++) {
    var text = tickArray[i];
    var component = text.split(',');
    var tradeTime = Number(component[0]);

    if (isNaN(tradeTime)) {
      var timeString = component[0];
      tradeTime = Number(timeString.substring(1, timeString.length));
      baseTime = tradeTime;
    }
    else{
      tradeTime = baseTime + (tradeTime * interval);
    }
    tradeTime *= 1000;
    var utc = moment(tradeTime);
    var date = utc.format('YYYY-MM-DD HH:mm:ss');

    var tickComponent = text.split(',');
    var tickData = { 'time': tradeTime , 'symbol': symbol};
    for (var j = 1; j < columnArray.length; j++) {
      var columnName = columnArray[j];
      tickData[columnName.toLowerCase()] = tickComponent[j];
    }
    // console.log(tickData);
    results.push(tickData);
  }
  return results;
}


exports.getStockHistory = getStockHistory;
