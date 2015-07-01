'use strict';

process.env.BLUEBIRD_DEBUG = 1;

var aerospike = require('aerospike'),
    Client = require('./lib').Client;

var client = new Client({
    hosts: [ { addr: '192.168.59.103', port: 3000 } ]
});

var key = aerospike.key('test','demo','foo');

client.connect().then(function() {
    var record = { i : 123, s : "str" };
    var metadata = { ttl: 10000, gen: 1 };

    return client.put(key, record, metadata, null);
}).then(function(res) {
    console.log(JSON.stringify(res));

    return client.get(key);
}).then(function(res) {
    console.log(JSON.stringify(res));

    return client.close();
});