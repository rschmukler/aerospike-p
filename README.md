# aerospike-p

Base [aerospike](https://github.com/aerospike/aerospike-client-nodejs) package version: **1.0.47**

## References

### Key

You can create a new `Key` instance by defining a plain object.

```javascript
var key = { ns: 'ns1', set: 'set1', key: 'key1' };
```

**Aerospike.key(namespace, set, key _[, digest]_)**

Or, you can use `.key()` function.

```javascript
var aerospike = require('aerospike-p');
var key = aerospike.key('ns1', 'set1', 'key1')
```

### Metadata

You can create a new `Metadata` instance by defining a plain object.

```javascript
var metadata = { ttl: 1000, gen: 10 };
```

**Aerospike.metadata(ttl _[, gen]_)**

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

You can still create an [original non-promisified Aerospike Client](https://github.com/aerospike/aerospike-client-nodejs/blob/master/docs/client.md) using `.client()` function:

```javascript
var aerospike = require('aerospike-p');
var config = {/* ... */};
var client = aerospike.client(config);   // non-promisified Client object
```

All these methods have the same promisification pattern: they take the same arguements except for `callback`, and, they return a `Promise` object that resolves or rejects.

- **Client.add(key, bins _[, metadata, policy]_)**: resolves to `undefined`
- **Client.batchExists(keys _[, policy]_)**
- **Client.batchGet(keys _[, policy]_)**
- **Client.batchSelect(keys _[, policy]_)**

Parameters:

Returns

