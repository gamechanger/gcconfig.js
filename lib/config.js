var environment = require('./environment'),
    _ = require('underscore'),
    fs = require('fs');


// Static members
var DIR = 'NODE_CONFIG_DIR',
    CONFIG_DIR = process.env[DIR] || process.cwd() + '/config',
    APP_NAME = require(process.cwd() + '/package').name,
    ENV = environment.get();
    
var Config = function() {
    this.env = ENV;
    var t = this;

    // Attempt to load the default and then env-specific config
    _.each(['default', this.env], function(item) {
        if (fs.existsSync(CONFIG_DIR + "/" + item + ".json")) {
            _.extend(t, require(CONFIG_DIR + "/" + item));
        }
    });

    // Also allow config values to be overridden using environment
    // variables if present.
    // Env var names are simply derived from the path to the given
    // config key in the object graph, uppercased, underscore-delimited
    // and prefixed with the app name, e.g. PUSH_DATABASE_URI.
    var overrideWithEnvVars = function(obj, path) {
        if (!path) {
            path = [APP_NAME.toUpperCase()];
        }

        _.each(obj, function(value, key) {
            var keyPath = path.concat(key.toUpperCase());
            if (_.isObject(value) && !_.isArray(value)) {
                return overrideWithEnvVars(value, keyPath);
            }
            if (process.env[keyPath.join("_")]) {
                obj[key] = process.env[keyPath.join("_")];
            }
        });
    };

    overrideWithEnvVars(this);
};

global.CONFIG = global.CONFIG || new Config();

module.exports = global.CONFIG;


