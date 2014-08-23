var assert = require('assert');
var _ = require('lodash');

describe('Romis',function(){
  var romis = require('../index');
  var client = romis.createClient();

  describe('Calling non-Redis-command functions',function(){
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
