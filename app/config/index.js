'use strict';

const env = process.env.NODE_ENV || 'development';
const configs = {
    base: {
        env,
        name: process.env.APP_NAME || 'blog-api',
        host: process.env.APP_HOST || '127.0.0.1',
        port: 7070
    },
    production: {
        port: process.env.APP_PORT || 7071
    },
    test: {
        port: 7072
    }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;