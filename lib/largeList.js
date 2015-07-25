'use strict';

var promisify = require('./utils/promisify');

var methods = [
    'add', 'update', 'remove', 'removeRange', 'find', 'findRange', 'scan', 'filter', 'destroy', 'size', 'getConfig'
];

function LargeList(asLargeList) {
    this._largeList = asLargeList;
    promisify(this._largeList, methods, this);
}

exports = module.exports = LargeList;
