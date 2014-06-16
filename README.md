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
