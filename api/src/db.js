const Sequelize = require('sequelize');
const consola = require('consola');
const config = require('./config.json');

module.exports = callback => {
    let connection = new Sequelize(config.db.database, config.db.user, config.db.password, {
        host    : config.db.host,
        dialect : config.db.dialect,
        port    : config.db.port,
        logging : config.debug ? consola.log : false
    });

    connection.authenticate()
        .then(() => {
            consola.success("Connected to database " + "\x1b[42m\x1b[30m%s\x1b[0m", config.db.database);
        })
        .catch(err => {
            throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, err);
        });

    // pass connection object in callback
    callback(connection);
}
