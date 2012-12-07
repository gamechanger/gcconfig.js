var optimist = require('optimist');

/**
 * Provides a temporary isolated environment context for tests to run in.
 * Any env vars or command line args which were provided when running the
 * test process are temporarily cached and removed from config for the
 * duration of each test.
 *
 * In addition, the working directory of the process is changed to ./test
 * for the duration of each test to allow test config to be loaded.
 *
 * This allows environment/config functionality
 * to be tested in a sandbox.
 *
 * This method should be called within a `describe` body to be applied to
 * all contained tests.
 */
exports.enable = function() {
    beforeEach(function() {
        // Save off any gcenv value temporarily
        this.actualGcenv = process.env.gcenv;
        this.actualArgv = optimist.argv;

        // Ensure there are no env vars present
        delete process.env.gcenv;
        optimist.argv = {};

        // Force the env and config modules to be loaded afresh
        delete require.cache[require.resolve('../../lib/config')];
        delete require.cache[require.resolve('../../lib/environment')];
        delete global.CONFIG;

        process.chdir('./test/fakeapp');
    });

    afterEach(function() {
        process.chdir('../..');
        // restore the real environment
        process.env.gcenv = this.actualGcenv;
        optimist.argv = this.actualArgv;
    });
};