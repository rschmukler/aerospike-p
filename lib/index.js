'use strict';

var Client = require('./client'),
    _as = require('aerospike');

exports.filter = _as.filter;
exports.operator = _as.operator;
exports.key = _as.key;
exports.status = _as.status;
exports.operations = _as.operations;
exports.language = _as.language;
exports.log = _as.log;
exports.predicates = _as.predicates;
exports.indexType = _as.indexType;
exports.scanPriority = _as.scanPriority;
exports.scanStatus = _as.scanStatus;
exports.client = _as.client;
exports._as = _as;

exports.Client = Client;
