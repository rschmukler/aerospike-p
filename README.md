# aerospike-p

A promisified Aerospike Node.js client library.

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

### Statement

...

### UDFArgs

...

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

All these methods have the same promisification pattern: they take the same arguements except for `callback`, and, they return a `Promise` object that resolves or rejects. For more details on the parameters and results of each methods, see corresponding non-promisified methods in [Aerospike.Client](https://github.com/aerospike/aerospike-client-nodejs/blob/master/docs/client.md).

- **Client.add(key, bins _[, metadata, policy]_)**: resolves to `undefined`
- **Client.append(key, bins _[, metadata, policy]_)**: resolves to `[record, metadata_, key]`
- **Client.batchExists(keys _[, policy]_)**: resolves to `results`
- **Client.batchGet(keys _[, policy]_)**: resolves to `results`
- **Client.batchSelect(keys _[, policy]_)**: resolves to `results`
- **Client.connect()**: resolves to `undefined`
- **Client.createIntegerIndex(args)**: resolves to `undefined`
- **Client.createStringIndex(args)**: resolves to `undefined`
- **Client.execute(key, udfArgs _[, policy]_)**: resolves to `response`
- **Client.exists(key _[, policy]_)**: resolves to `[metadata, key]`
- **Client.get(key _[, policy]_)**: resolves to `[record, metadata, key]`
- **Client.indexRemove(namespace, index _[, policy]_)**: resolves to `undefined`
- **Client.info(request _[, host, policy]_)**: resolves to `[response, host]`
- **Client.operate(key, operations _[, metadata, policy]_)**: resolves to `[record, metadata, key]`
- **Client.prepend(key, bins _[, metadata, policy]_)**: resolves to `[record, metadata, key]`
- **Client.put(key, record _[, metadata, policy]_)**: resolves to `key`
- **Client.remove(key _[, policy]_)**: resolves to `key`
- **Client.select(key, bins _[, policy]_)**: resolves to `[record, metadata, key]`
- **Client.udfRegister(udfModule _[, policy]_)**: resolves to `undefined`
- **Client.udfRemove(udfModule _[, policy]_)**: resolves to `undefined`

These methods have a slightly different patterns.

- **Client.close()**: executes synchronously then it returns a Promise that resolves to `undefined` immediately.
- **Client.LargeList(key, binName _[, writePolicy, createModule])**: returns a Promise that resolves to a promisified `LargeList` instance.
- **Client.query(namespace, set, statement)**: returns a Promise that resolves to a promisified `Query` instance.
- **Client.updateLogging()**: executes synchronously then it returns a Promise that resolves to `undefined` immediately.

### LargeList

All these methods have the same promisification pattern: they take the same arguements except for `callback`, and, they return a `Promise` object that resolves or rejects. For more details on the parameters and results of each methods, see corresponding non-promisified methods in [Aerospike.LargeList](https://github.com/aerospike/aerospike-client-nodejs/blob/master/docs/largelist.md).

- **LargeList.add(value)**: resolves to `response` (value returned by LDT function `add`)
- **LargeList.add(values)**: resolves to `response` (value returned by LDT function `add`)
- **LargeList.update(value)**: resolves to `response` (value returned by LDT function `add`)
- **LargeList.update(values)**: resolves to `response` (value returned by LDT function `add`)
- **LargeList.remove(value)**: resolves to `response` (value returned by LDT function `add`)
- **LargeList.remove(values)**: resolves to `response` (value returned by LDT function `add`)
- **LargeList.removeRange(begin, end)**: resolves to `response` (count of entries removed)
- **LargeList.find(value)**: resolves to `response` (list of entries selected)
- **LargeList.find(values, udfArgs)**: resolves to `response` (list of entries selected)
- **LargeList.find(begin, end)**: resolves to `response` (list of entries selected)
- **LargeList.find(begin, end, filter)**: resolves to `response` (list of entries selected)
- **LargeList.scan()**: resolves to `response` (all the entries in the list)
- **LargeList.filter(udfArgs)**: resolves to `response` (list of entries selected)
- **LargeList.destroy()**: resolves to `response` (= `undefined`)
- **LargeList.size()**: resolves to `response` (size of the the list)
- **LargeList.getConfig()**: resolves to `response` (map of list config parameters)

### Query

- **Query.execute()**: returns a `RecordStream` object, which is exactly the same as the non-promisified Query.
- **Query.Info(scanid)**: returns a Promise object that resolves to `scantInfo`.

### Aliases

You can use these constants, functions, or attributes in the exact same ways as you would with the original Aerospike client.

- **Aerospike.policy**
- **Aerospike.filter**
- **Aerospike.operations**
- **Aerospike.operators**
- **Aerospike.predicates**
- **Aerospike.IndexType**
- **Aerospike.status**
- **Aerospike.scanStatus**
- **Aerospike.scanPriority**
- **Aerospike.log**
- **Aerospike.language**
