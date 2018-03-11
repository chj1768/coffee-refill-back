const pkginfo = require('../../package.json');

exports.welcome = ctx => {
    // BUSINESS LOGIC
    const data = {
        name: pkginfo.name,
        version: pkginfo.version,
        author: pkginfo.author
    };

    ctx.res.ok(data, 'Hello, API!');
};