'use strict';

var P = require('bluebird'),
    aerospike = require('aerospike'),
    util = require('util'),
    _ = require('lodash');

exports = module.exports = function(srcObj, methods, destObj) {
    console.assert(srcObj && _.isObject(srcObj) && !_.isArray(srcObj), 'Invalid srcObj: ' + util.inspect(srcObj));
    console.assert(methods && _.isArray(methods) && _.all(methods, _.isString), 'Invalid methods: ' + util.inspect(methods));
    console.assert(destObj && _.isObject(destObj) && !_.isArray(destObj), 'Invalid destObj: ' + util.inspect(destObj));

    _.each(methods, function(m) {
        var fn = srcObj[m];
        console.assert(fn && _.isFunction(fn) && (fn.length > 0), 'Invalid function: ' + m);

        destObj[m] = function() {
            // change undefined args to "null"
            var args = _.map(arguments, function(a) { return _.isUndefined(a) ? null : a; });

            return new P(function(resolve, reject) {
                // prepend callback function
                args.push(function() {
                    var err = arguments[0];
                    if(err.code === aerospike.status.AEROSPIKE_OK) {
                        if(arguments.length <= 2) {
                            resolve(arguments[1]);
                        } else {
                            resolve(Array.prototype.slice.call(arguments, 1));
                        }

                    } else {
                        reject(err);
                    }
                });

                fn.apply(srcObj, args);
            });
        };
    });
};
