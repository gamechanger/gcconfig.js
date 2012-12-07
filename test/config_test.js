var isolatedEnvironment = require('./support/isolated_environment');

describe("Config", function() {

    isolatedEnvironment.enable();

    var config = function() {
        return require('../lib/config');
    };

    it("should expose the environment on config.env", function() {
        process.env.gcenv = 'test';
        config().env.should.eql('test');
    });

    it("should return default config if no additional settings provided for env", function() {
        //console.log(config().env);
        config().database.uri.should.eql("mongodb://localhost/default");
    });

    it("should allow env-specific config to be provided in a JSON file", function() {
        process.env.gcenv = 'test';
        config().database.uri.should.eql("mongodb://localhost/test");
    });

    it("should allow settings to be overridden using environment variables", function() {
        process.env.FAKEAPP_DATABASE_URI = "another uri";
        config().database.uri.should.eql("another uri");
        delete process.env.FAKEAPP_DATABASE_URI; // clean up
    });
});