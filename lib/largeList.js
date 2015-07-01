'use strict';

var promisify = require('./promisify');

var methods = [
    'add', 'update', 'remove', 'removeRange', 'find', 'findRange', 'scan', 'filter', 'destroy', 'size', 'getConfig'
];

function LargeList(asLargeList) {
    var self = this;

    promisify(asLargeList, methods, self);
}

exports = module.exports = LargeList;
