const Sequelize = require('sequelize');
const consola = require('consola');
const config = require('../../config/config.json');

module.exports = async (callback) => {
    const db = {};

    db.sequelize = new Sequelize(config.api.db.database, config.api.db.user, config.api.db.password, {
        host: config.api.db.host,
        dialect: config.api.db.dialect,
        port: config.api.db.port,
        logging: config.api.debug ? consola.log : false,
        define: {
            // prevent sequelize from pluralizing table names
            freezeTableName: true
        }
    });

    // test connection
    await db.sequelize.authenticate();

    consola.success('Connected to database ' + '\x1B[42m\x1B[30m%s\x1B[0m', config.api.db.database);

    db.models = require('./models');

    console.log(db.models.hub);

    // db.sequelize.sync();

    // pass connection object in callback
    callback(db);
}
