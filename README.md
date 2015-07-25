# aerospike-p

Base [aerospike](https://github.com/aerospike/aerospike-client-nodejs) package version: **1.0.47**

## Client

To create a new Client instance:

```javascript
var aerospike = require('aerospike-p');
var config = {};
var client = new aerospike.Client(config);
```

You can still create an original non-promisified Aerospike Client using `.client()` function:

```javascript
var aerospike = require('aerospike-p');
var config = {};
var client = aerospike.client(config);
```
