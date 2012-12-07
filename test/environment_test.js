var optimist = require('optimist'),
    isolatedEnvironment = require('./support/isolated_environment');

describe("Environment", function() {
    isolatedEnvironment.enable();

    it("should default the environment to local", function(done) {
        require('../lib/environment').get().should.eql('local');
        done();
    });

    it("should allow the env to be set from the gcenv environment variable", function(done) {
        process.env.gcenv = 'something';
        require('../lib/environment').get().should.eql('something');
        done();
    });

    it("should allow the env to be set from a command line arg", function(done) {
        optimist.argv = {e: 'blah'};
        var environment = require('../lib/environment');
        environment.get().should.eql('blah');
        done();
    });
});