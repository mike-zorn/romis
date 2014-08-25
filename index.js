var redis = require('redis'),
    _ = require('lodash'),
    Promise = require('bluebird');

exports.fromRedis = function(client)
{
  var allFunctions = _.functions(client);

  var result= Object.create(client);
  result._redis = client;

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
}

exports.createClient = function()
{
  var client = redis.createClient.apply(redis, arguments);
  return exports.fromRedis(client);
}
