# gcconfig.js

A simple configuration loader package for GC node.js apps. gcconfig.js uses a convention-based approach to detect and load per-environment configuration into an app.

## How to use gcconfig.js

1. Install into your project's `node_modules`:
    ```
    npm install @gamechanger/config

    ```

1. Create your app's configuration in <APP DIR>/config or using environment variables as appropriate (see "How gcconfig.js loads config" below).
1. Within your app, require `@gamechanger/config` and use this object to access your config. For example:

    ```javascript
    var config = require('@gamechanger/config');

    var db = mongoose.connect(config.database.uri, config.database.port);
    ```
1. You can use gcconfig to get the current application running environment:

    ```javascript
    var config = require('@gamechanger/config');
    console.log('Environment is ' + config.env);
    ```

    See "Specifying the environment" below.


## How gcconfig.js loads config

These are the steps gcconfig.js goes through to load application config into a single hash which can be used by the application:

 - First it looks for a `default.json` file in the application's config folder and loads the object declared in this file if present.
 - Next it looks for a JSON config file in the application's config folder which matches the current environment. E.g. if the current environment is "staging", then it will look for `staging.json`. Any provided config is used to override/extend that already loaded.
 - Finally it looks for any environment variables overrides which have been provided to the application. It does this by checking for environment variables which match existing config keys it has already loaded, based on the naming convention: `<app name>_<key>_<key>..`. e.g. `MYAPP_DATABASE_URI`.


 ### Notes
  - The application config folder is by default assumed to be `<APP DIR>/config`. This can be optionally overridden by setting the `NODE_CONFIG_DIR` enviroment variable.

## Specifying the environment

gcconfig.js also takes care of determining the current environment and allows you to provide the current environment to your application in once of two ways:

1. By setting the `gcenv` environment variable.
2. By adding a `-e <environment>` switch to the command line when launching your app.

## Development

To run unit tests, first run `npm install` to make sure all dependencies are installed. Then run `make test`.
