var redis = require('redis'),
    _ = require('lodash'),
    Promise = require('bluebird');


exports.createClient = function() {
  var client = redis.createClient.apply(redis, arguments),
      redis_commands = _.keys(Object.getPrototypeOf(client));

  return _.reduce(redis_commands, function(acc, command) {
    acc[command] = function() { 
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
    return acc;
  }, {});
};
