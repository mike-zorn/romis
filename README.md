romis
=====

[node_redis](https://github.com/mranney/node_redis) but with promises. This
exposes the exact same API as `node_redis`, but all the redis commands don't
take callbacks and instead return promises.

Usage
=====

```javascript
var romis = require('romis'),
    client = romis.createClient();

client.get('foo').
then(console.log).
catch(console.error);
```
