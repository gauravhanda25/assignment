'use strict';

const config = {
    local: {
        host: 'localhost:',
        port: 4000,
        baseUrl: 'http://localhost:4000/',
        DATABASE: {
            dbname: 'assignment-nodejs',
            host: 'mongodb://localhost:',
            port: 27017        
        }
    }
};
module.exports.get = function get(env) {
    return config[env] || config.default;
}