import Sequelize from 'sequelize';
import consola from 'consola';
import config from './config.json';

export default callback => {
    if (config.debug) consola.warn("The applicaton is running in development mode. For use in production, make sure to disable the debug option.");

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

    global.db = connection;

    // connect to a database if needed, then pass it to `callback`:
    callback(connection);
}
