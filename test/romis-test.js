var assert = require('assert');
var _ = require('lodash');
var romis = require('../index');
var Promise = require('bluebird');

describe('Romis',function(){
  describe('Migrating a legacy code base to romis',function(){
    var redis = require('redis');
    var client = redis.createClient();
    var romisClient = null;

    it('can create a romis object from a redis instance', function(){
      romisClient = romis.fromRedis(client);
      assert(romisClient);
    });

    it('exposes the redis client in _redis property', function(){
      assert(typeof romisClient._redis === 'object');
    });

    it('will return a Promise when using romis',function(done){
      result = romisClient.hset('test','hello','world');
      assert(result instanceof Promise);
      result.then(function(){
        done();
      });
    });
  });

  describe('Calling non-Redis-command functions',function(){
    var client = romis.createClient();

    it('has EventEmitter functions',function(){
      assert(typeof client.on === 'function');
      assert(typeof client.addListener === 'function');
    });

    it('will emit an error when things go wrong', function(done){
      var client = romis.createClient(1,'dasjkdasjkadsjkdsajkdas');
      client.on('error',function(err){
        done();
      });
      client.ping();
    });
  });

});
