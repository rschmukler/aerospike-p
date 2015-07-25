'use strict';

var promisify = require('./utils/promisify'),
    _ = require('lodash');

var methods = [
    'Info'
];

function Query(asQuery) {
    this._query = asQuery;
    promisify(this._query, methods, this);
    this.execute = _.bind(this._query.execute, this._query);
}

exports = module.exports = Query;
