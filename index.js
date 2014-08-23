var redis = require('redis'),
    _ = require('lodash'),
    Promise = require('bluebird');

exports.createClient = function()
{
  var client = redis.createClient.apply(redis, arguments);
  var allFunctions = _.functions(client);

  var result= {
    _client : client
  };

  _.each(allFunctions,function(func){
    result[func] = function(){ return client[func].apply(client,arguments); };
  });

  _.each(allFunctions, function(command) {
    if(command.search(/^[A-Z]+$/)===-1) return;

    result[command] = result[command.toLowerCase()] = function() {
      var args = _.toArray(arguments);
      return new Promise(function(resolve, reject) {
        client[command].apply(client, args.concat([function(err, data) {
          if(err) {
            reject(err);
          }
          else {
            resolve(data);
          }
        }]));
      });
    };
  });

  return result;
};
