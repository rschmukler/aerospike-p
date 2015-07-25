'use strict';

var promisify = require('./utils/promisify'),
    LargeList = require('./largeList'),
    Query = require('./query'),
    P = require('bluebird'),
    _as = require('aerospike');

var methods = [
    'add', 'append', 'batchExists', 'batchGet', 'batchSelect', /*'close',*/
    'connect', 'createIntegerIndex', 'createStringIndex',
    'execute', 'exists', 'get', 'info', 'indexRemove', /*'LargeList',*/
    'operate', 'prepend', 'put', /*'query',*/
    'remove', 'select',
    'udfRegister', 'udfRemove' /*, 'updateLogging'*/
];

function Client(config) {
    this._client = _as.client(config);
    console.assert(this._client, 'Failed to create Aerospike Client');

    promisify(this._client, methods, this);
}

Client.prototype.close = function() {
    this._client.close();
    return P.resolve();
};

Client.prototype.LargeList = function(key, binName, writePolicy, createModule) {
    return P.resolve(new LargeList(this, this._client.LargeList(key, binName, writePolicy, createModule)));
};

Client.prototype.query = function(namespace, set, statement) {
    return P.resolve(new Query(this, this._client.query(namespace, set, statement)));
};

Client.prototype.updateLogging = function(logConfig) {
    this._client.updateLogging(logConfig);
    return P.resolve();
};

exports = module.exports = Client;
