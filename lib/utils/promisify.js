'use strict';

var P = require('bluebird'),
    aerospike = require('aerospike'),
    _ = require('lodash');

exports = module.exports = function(srcObj, methods, destObj) {
    _.each(methods, function(m) {
        var fn = srcObj[m];
        console.assert(fn && _.isFunction(fn), 'No client function: ' + m);

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
                        var e = new Error(err.message);
                        e.asError = err;
                        reject(e);
                    }
                });

                fn.apply(srcObj, args);
            });
        };
    });
};
