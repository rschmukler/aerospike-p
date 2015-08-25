'use strict';

const promisify = require('../../lib/utils/promisify'),
    P = require('bluebird'),
    async = P.coroutine,
    assert = require('assert'),
    _as = require('aerospike'),
    _ = require('lodash');

const emptyFn = function() {};

const errorOk = { code: _as.status.AEROSPIKE_OK };
const errorTimeout = { code: _as.status.AEROSPIKE_ERR_TIMEOUT };

const a0r0Fn = function(cb) { cb(errorOk); };
const a1r0Fn = function(a1, cb) { cb(errorOk); };
const a2r0Fn = function(a1, a2, cb) { cb(errorOk); };
const a3r0Fn = function(a1, a2, a3, cb) { cb(errorOk); };

const a0r1Fn = function(cb) { cb(errorOk, 'aerospike-p'); };
const a1r1Fn = function(a1, cb) { cb(errorOk, 'aerospike-p'); };
const a2r1Fn = function(a1, a2, cb) { cb(errorOk, 'aerospike-p'); };
const a3r1Fn = function(a1, a2, a3, cb) { cb(errorOk, 'aerospike-p'); };

const a0r2Fn = function(cb) { cb(errorOk, 'aerospike-p', 5264); };
const a1r2Fn = function(a1, cb) { cb(errorOk, 'aerospike-p', 5264); };
const a2r2Fn = function(a1, a2, cb) { cb(errorOk, 'aerospike-p', 5264); };
const a3r2Fn = function(a1, a2, a3, cb) { cb(errorOk, 'aerospike-p', 5264); };

const a0r3Fn = function(cb) { cb(errorOk, 'aerospike-p', 5264, true); };
const a1r3Fn = function(a1, cb) { cb(errorOk, 'aerospike-p', 5264, true); };
const a2r3Fn = function(a1, a2, cb) { cb(errorOk, 'aerospike-p', 5264, true); };
const a3r3Fn = function(a1, a2, a3, cb) { cb(errorOk, 'aerospike-p', 5264, true); };

const a0reFn = function(cb) { cb(errorTimeout); };
const a1reFn = function(a1, cb) { cb(errorTimeout); };
const a2reFn = function(a1, a2, cb) { cb(errorTimeout); };
const a3reFn = function(a1, a2, a3, cb) { cb(errorTimeout); };


const _compareFn = async(function* (originalThis, originalFn, promisifiedThis, promisifiedFn) {
    assert(_.isFunction(originalFn) && _.isFunction(promisifiedFn));

    const args = _.times(originalFn.length - 1, function () { return _.random(0, 10000); });

    let pRet;
    let resolved = true;

    try {
        pRet = yield promisifiedFn.apply(promisifiedThis, args);
    } catch(err) {
        resolved = false;
        pRet = err;
    }

    var oRet = yield (new P(function(res) {
        args.push(function() { res(Array.prototype.slice.call(arguments)); });
        originalFn.apply(originalThis, args);
    }));

    assert(oRet.length >= 1);

    if(resolved) {
        assert.strictEqual(oRet[0].code, _as.status.AEROSPIKE_OK);
        if(oRet.length === 1) { assert.strictEqual(pRet, undefined); }
        else if(oRet.length === 2) { assert.deepEqual(pRet, oRet[1]); }
        else { assert.deepEqual(pRet, oRet.slice(1)); }
    } else {
        assert.notStrictEqual(oRet[0].code, _as.status.AEROSPIKE_OK);
        assert.strictEqual(pRet.code, oRet[0].code);
    }
});

describe('utils/promisify', function() {
    function expect(src, methods, dest) {
        it('promisify(' + JSON.stringify(src) + ', ' + JSON.stringify(methods) + ', ' + JSON.stringify(dest) + ')', async(function* () {
            const srcCopy = _.cloneDeep(src);
            const destCopy = _.cloneDeep(dest);

            promisify(src, methods, dest);
            assert.deepEqual(src, srcCopy); // src must not change

            yield P.each(_.keys(dest), async(function* (k) {
                const pfn = dest[k];

                if(_.isFunction(pfn) && _.contains(methods, k)) {
                    const ofn = src[k];
                    yield _compareFn(src, ofn, dest, pfn);
                } else {
                    assert.deepEqual(pfn, destCopy[k]);
                }
            }));
        }));
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
    });

    describe('empty method list', function() {
        expect({}, [], {});
        expect({ foo: emptyFn }, [], {});
        expect({}, [], { foo: emptyFn });
    });

    describe('simple conversions', function() {
        expect({ foo: a0r0Fn }, ['foo'], {});
        expect({ foo: a0r0Fn }, ['foo'], { foo: 'bar' }); // 'foo' attribute overwritten
        expect({ foo: a1r0Fn }, ['foo'], {});
        expect({ foo: a2r0Fn }, ['foo'], {});
        expect({ foo: a3r0Fn }, ['foo'], {});

        expect({ foo: a0r1Fn }, ['foo'], {});
        expect({ foo: a1r1Fn }, ['foo'], {});
        expect({ foo: a2r1Fn }, ['foo'], {});
        expect({ foo: a3r1Fn }, ['foo'], {});
        expect({ foo: a0r2Fn }, ['foo'], {});
        expect({ foo: a1r2Fn }, ['foo'], {});
        expect({ foo: a2r2Fn }, ['foo'], {});
        expect({ foo: a3r2Fn }, ['foo'], {});
        expect({ foo: a0r3Fn }, ['foo'], {});
        expect({ foo: a1r3Fn }, ['foo'], {});
        expect({ foo: a2r3Fn }, ['foo'], {});
        expect({ foo: a3r3Fn }, ['foo'], {});
    });

    describe('errors', function() {
        expect({ foo: a0reFn }, ['foo'], {});
        expect({ foo: a1reFn }, ['foo'], {});
        expect({ foo: a2reFn }, ['foo'], {});
        expect({ foo: a3reFn }, ['foo'], {});
    });
});
