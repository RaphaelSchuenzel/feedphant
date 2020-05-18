const Sequelize = require('sequelize');
const consola = require('consola');
const config = require('../../../config/config.json');

module.exports = async (callback) => {
    const connection = new Sequelize(config.api.db.database, config.api.db.user, config.api.db.password, {
        host: config.api.db.host,
        dialect: config.api.db.dialect,
        port: config.api.db.port,
        logging: config.api.debug ? consola.log : false
    });

    await connection.authenticate();

    consola.success('Connected to database ' + '\x1b[42m\x1b[30m%s\x1b[0m', config.api.db.database);

    // pass connection object in callback
    callback(connection);
}
