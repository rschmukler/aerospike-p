'use strict';

var util = require('util'),
    _ = require('lodash');

function create(attributes, valueFn) {
    var type = function() {};

    console.assert(attributes, 'Required param: attributes');
    console.assert(_.isArray(attributes), 'Invalid attributes: ' + attributes);

    _.each(attributes, function(attr) {
        type.prototype[attr.name] = function() {
            var param = arguments[0];
            if(_.isUndefined(param)) {
                param = attr.defaultValue;
            }

            if(_.isFunction(attr.validate)) {
                if(!attr.validate(param)) {
                    throw new Error('Invalid param [' + attr.name + ']: ' + util.inspect(param));
                }
            }

            if(!this._value) { this._value = {}; }
            this._value[attr.name] = param;
            return this;
        };
    });

    if(valueFn) {
        console.assert(_.isFunction(valueFn), 'Invalid valueFn: ' + util.inspect(valueFn));
        type.prototype.value = function() {
            return valueFn.apply(this._value, arguments);
        };
    } else {
        type.prototype.value = function() {
            return this._value;
        };
    }

    return type;
}

exports = module.exports = create;
