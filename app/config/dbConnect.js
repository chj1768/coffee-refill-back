const mongoose = require('mongoose');

const connect = () => {
    // 연결 되어있으면 기존것을 연결시키고
    if (connection && mongoose.connection.readyState === 1) return Promise.resolve(connection);
    // 없으면 새로 연결함
    return mongoose.connect('mongodb://coffee:coffee@ds261088.mlab.com:61088/coffee_refill').then(
        conn => {
            connection = conn;
            return connection;
        }
    );
};

const createResponse = (status, body) => ({
    statusCode: status,
    body: JSON.stringify(body)
});

// 스토리 만들기
exports.createConnect = (ctx) => {
    ctx.callbackWaitsForEmptyEventLoop = false;
    connect().then(
        () => {
            console.log('message: connected to db');
        }
    ).catch(
        (e) => {
            console.log('error in connect', e);
        }
    )
};