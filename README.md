# aerospike-p

Base [aerospike](https://github.com/aerospike/aerospike-client-nodejs) package version: **1.0.44**

## Promisification Status

### Client

Promisified:
- add()
- append()
- batchExists()
- batchGet()
- batchSelect()
- connect()
- createIntegerIndex()
- createStringIndex()
- execute()
- exists()
- get()
- info()
- indexRemove()
- operate()
- prepend()
- put()
- remove()
- select()
- udfRegister()
- udfRemove()

Other methods:
- LargeList(): returns a promisified LargeList object
- query(): return raw `query` object (not promisified)
- updateLogging(): executes raw `updateLogging()` function (not returning Promise)
- close(): executes raw `close()` function then resolves to undefined

### LargeList

Promisified:
- add()
- update()
- remove()
- removeRange()
- find()
- findRange()
- scan()
- filter()
- destroy()
- size()
- getConfig()
