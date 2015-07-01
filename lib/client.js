'use strict';

var promisify = require('./promisify'),
    LargeList = require('./largeList'),
    P = require('bluebird'),
    aerospike = require('aerospike');

var methods = [
    'add', 'append', 'batchExists', 'batchGet', 'batchSelect', /*'close',*/
    'connect', 'createIntegerIndex', 'createStringIndex',
    'execute', 'exists', 'get', 'info', 'indexRemove', /*'LargeList',*/
    'operate', 'prepend', 'put', /*'query',*/
    'remove', 'select',
    'udfRegister', 'udfRemove' /*, 'updateLogging'*/
];

function Client(config) {
    var self = this;

    self._client = aerospike.client(config);
    console.assert(self._client);

    promisify(self._client, methods, self);
}

Client.prototype.LargeList = function() {
    var self = this;

    return new LargeList(self, self._client.LargeList.apply(self._client, arguments));
};

Client.prototype.query = function() {
    var self = this;

    return self._client.query.apply(self._client, arguments);
};

Client.prototype.updateLogging = function() {
    var self = this;

    self._client.updateLogging.apply(self._client, arguments);
};

// TODO: current aerospike impl does not have callback
Client.prototype.close = function() {
    var self = this;

    self._client.close();

    return P.resolve();
};

exports = module.exports = Client;
