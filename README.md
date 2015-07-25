# aerospike-p

Base [aerospike](https://github.com/aerospike/aerospike-client-nodejs) package version: **1.0.47**

## References

### Key

You can create a new `Key` instance using `.key()` function.

```javascript
var aerospike = require('aerospike-p');
var key = aerospike.key('ns1', 'set1', 'key1')
```

Or, you can simply define a plain object.

```javascript
var key = { ns: 'ns1', set: 'set1', key: 'key1' };
```

### Metadata

You can create a new `Metadata` instance by defining a plain object.

```javascript
var metadata = { ttl: 1000, gen: 10 };
```

Or you can use `.metadata()` function.

```javascript
var aerospike = require('aerospike-p');
var metadata = aerospike.metadata(1000, 10); // ttl: 1000, gen: 10
```

### Client

To create a promisified Client instance:

```javascript
var aerospike = require('aerospike-p');
var config = {/* ... */};
var client = new aerospike.Client(config);  // promisified Client object
```

You can still create an original non-promisified Aerospike Client using `.client()` function:

```javascript
var aerospike = require('aerospike-p');
var config = {/* ... */};
var client = aerospike.client(config);   // non-promisified Client object
```
#### .add(key, bins, metadata, policy)

