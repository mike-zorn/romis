romis
=====

[node_redis](https://github.com/mranney/node_redis) but with promises. This
exposes the exact same API as `node_redis`, but all the redis commands don't
take callbacks and instead return promises.

Install with:
``` bash
npm install --save romis
```

Usage
=====

```javascript
var romis = require('romis'),
var Promise = require('bluebird');
var client = romis.createClient();
var log = console.log.bind(console);
var error = console.error.bind(console);

// Execute all promises
Promise.all([
    client.set("string key","string val"),
    client.hset("hash key","hastest 1", "some value"),
    client.hset(["hash key", "hashtest 2", "some other value"]),
    client.hkeys("hash key")
]).then(function(results){
    return results.pop(); // Return keys inside `hash key`
})
.then(log) // Log resulting keys
.catch(error); // Catch any errors that occured in the chain
```

## Transitioning from `node_redis` to Promises

To help you move from `node_redis` callbacks to `romis`Promises, both `romis` and `node_redis` work well in parallel. You can keep your existing code base unchanged and write new code using Promises.


### Using `romis.fromRedis`

Keep your legacy code and re-use your exisitng client instance with the `fromRedis` function.

```javascript
// keep your legacy code unchanged
var redis = require('redis');
var client= redis.createClient();

client.hset('hash key','some field', 'some value', function(err,result){
  // do whatever
});

// re-use the redis client with romis.fromRedis
var romis = require('romis');
var romisClient = romis.fromRedis(client);
romisClient.hset('hash key','some field', 'some value')
.then(function(result){
  // hello, Promises!
})
.catch(error) {
  // handle error
}
```

### Using the `_redis` property

The object returned by romis' `createClient` or `fromRedis` exposes the original [`node-redis`](https://github.com/mranney/node_redis) object in a property called `_redis`. You can access this property should you need to use traditional, callback-based functions for backwards compatibility.

```javascript
var romis = require('romis'),
var romisClient = romis.createClient();

// call an old-style, callback-based method
romisClient._redis.hset('hash key','some value', function(err,result){
  //
});
```
