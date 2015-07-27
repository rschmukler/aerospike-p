'use strict';

var Client = require('./client'),
    Metadata = require('./metadata'),
    UDFArgs = require('./udfArgs'),
    _as = require('aerospike');

exports.policy = _as.policy;
exports.filter = _as.filter;
exports.operations = _as.operations;
exports.operator = _as.operator;
exports.predicates = _as.predicates;
exports.IndexType = _as.IndexType;
exports.status = _as.status;
exports.scanStatus = _as.scanStatus;
exports.scanPriority = _as.scanPriority;
exports.log = _as.log;
exports.language = _as.language;
exports.key = _as.key;
exports.client = _as.client;

exports.udfArgs = UDFArgs.create;
exports.metadata = Metadata.create;
exports.Client = Client;
