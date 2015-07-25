'use strict';

function create(moduleName, functionName, args) {
    return { module: moduleName, funcname: functionName, args: args };
}

exports.create = create;
