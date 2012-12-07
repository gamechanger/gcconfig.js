/*
    Module which determines the current enviroment and allows it to be
    optionally overridden (e.g. for testing purposes).

    The default environment is assumed to be "local" if no specific
    config is provided.

    Otherwise the environment can be specified by setting the "gcenv"
    environment variable.

    The environment can also be overridden at runtime using the "set()"
    method.
*/

var argv = require('optimist').argv;

module.exports.get = function() {

    if (!module.env) {
        module.env = 'local';

        if (process.env.gcenv !== undefined) {
            module.env = process.env.gcenv;
        }

        if (argv.e) {
            module.env = argv.e;
        }
    }
    return module.env;
};