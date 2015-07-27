'use strict';

var promisify = require('../../lib/utils/promisify'),
    P = require('bluebird'),
    assert = require('assert'),
    _ = require('lodash');

var d1 = 'dummy';
var d2 = 5264;
var d3 = true;
var d4 = null;
var d5 = undefined;

var emptyFn = function() {};

var a0r0Fn = function(cb) { cb(); };
var a0r0pFn = function() { return P.resolve(); };

var a1r0Fn = function(a1, cb) { cb(); };
var a1r0pFn = function(a1) { return P.resolve(); };

var a2r0Fn = function(a1, a2, cb) { cb(); };
var a2r0pFn = function(a1, a2) { return P.resolve(); };

var a3r0Fn = function(a1, a2, a3, cb) { cb(); };
var a3r0pFn = function(a1, a2, a3) { return P.resolve(); };

function _compareFn(thisArg, originalFn, promisifiedFn) {
    return P.try(function() {
        if(!_.isFunction(originalFn) || !_.isFunction(promisifiedFn)) { return false; }
        if((originalFn.length - 1) !== promisifiedFn.length) { return false; }

        var args = _.times(promisifiedFn.length, function() { return _.random(0,10000); });

        return promisifiedFn.apply(thisArg, args).then(function(pRet) {
            return new P(function(res, rej) {
                args.push(function() {
                    var oRet = Array.prototype.slice.call(arguments);

                });
                originalFn.apply(thisArg, args);
            });
        });
    });
}

describe('utils/promisify', function() {
    function expect(src, methods, dest) {
        it('promisify(' + JSON.stringify(src) + ', ' + JSON.stringify(methods) + ', ' + JSON.stringify(dest) + ')', function() {
            return P.try(function() {
                var srcCopy = _.cloneDeep(src);
                var destCopy = _.cloneDeep(dest);
                var methodsCopy = {};
                _.each(methods, function(m) { methodsCopy[m] = dest[m]; });

                promisify(src, methods, dest);
                assert.deepEqual(src, srcCopy); // src must not change

                return P.each(_.keys(dest), function(k) {
                    return P.try(function() {
                        var fn = dest[k];

                        if(_.isFunction(fn) && _.contains(methods, k)) {
                            var ofn = destCopy[k];
                            assert(_.isFunction(ofn));

                            assert.equal(fn.length + 1, ofn.length);

                            /*
                            return v(d1, d2, d3, d4, d5).bind({}).then(function(r) {
                                console.log('r: ' + r);
                                this.r = r;
                                return ev(d1, d2, d3, d4, d5);
                            }).then(function(r) {
                                console.log('r: ' + r);
                                assert.deepEqual(this.r, r);
                            });
                            */
                        } else {
                            assert.deepEqual(fn, destCopy[k]);
                        }
                    });
                });
            });
        });
    }

    function expectError(src, methods, dest) {
        it('promisify(' + JSON.stringify(src) + ', ' + JSON.stringify(methods) + ', ' + JSON.stringify(dest) + ') => error', function() {
            assert.throws(function() { promisify(src, methods, dest); });
        });
    }

    describe('param validation', function() {
        expectError(null, [], {});
        expectError([], [], {});
        expectError('src', [], {});
        expectError({}, null, {});
        expectError({}, {}, {});
        expectError({}, 'methods', {});
        expectError({}, [], null);
        expectError({}, [], []);
        expectError({}, [], 'dest');
    });

    describe('invalid methods', function() {
        expectError({}, ['foo'], {}); // not exists
        expectError({ foo: 'bar' }, ['foo'], {}); // not a function
        expectError({ foo: emptyFn }, ['foo'], {}); // empty function
    });

    describe('empty method list', function() {
        expect({}, [], {}, {});
        expect({ foo: emptyFn }, [], {}, {});
        expect({}, [], { foo: emptyFn }, { foo: emptyFn });
    });

    describe('simple conversions', function() {
        expect({ foo: a0r0Fn }, ['foo'], {}, { foo: a0r0pFn });
        expect({ foo: a0r0Fn }, ['foo'], { foo: 'bar' }, { foo: a0r0pFn }); // 'foo' attribute overwritten
        expect({ foo: a1r0Fn }, ['foo'], {}, { foo: a0r0pFn });
        expect({ foo: a2r0Fn }, ['foo'], {}, { foo: a0r0pFn });
        expect({ foo: a3r0Fn }, ['foo'], {}, { foo: a0r0pFn });
    });
});