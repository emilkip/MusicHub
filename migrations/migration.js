const configs = require('../src/configs/config')(process.env.NODE_ENV);
const migrationFiles = require('./migrationFiles');
const mongoose = require('mongoose');
const Promise = require('bluebird');


mongoose
    .connect(`mongodb://${configs.mongodb.host}:${configs.mongodb.port}/${configs.mongodb.dbName}`)
    .catch((err) => {
        console.log(err)
    });


Promise.map(migrationFiles, (file) => {
    return require(`./${file}`).run();
});