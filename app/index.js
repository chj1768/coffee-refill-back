const config = require('./config');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const responseHandler = require('./middlewares/responseHandler');
const router = require('./routes');


const app = new Koa();

// Trust proxy
app.proxy = true;

// Set middlewares
app.use(
    bodyParser({
        enableTypes: ['json', 'form'],
        formLimit: '10mb',
        jsonLimit: '10mb'
    })
);
app.use(
    cors({
        origin: '*',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        exposeHeaders: ['X-Request-Id']
    })
);
app.use(responseHandler());

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

// Handle uncaught errors
app.on('error', () => {
    console.log('Unhandled exception occured');
});

// Start server
if (!module.parent) {
    app.listen(config.port, config.host, () => {
        console.log(`API server listening on ${config.host}:${config.port}, in ${config.env}`);
    });
}

// Expose app
module.exports = app;