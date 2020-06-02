const Sequelize = require('sequelize');
const consola = require('consola');
const config = require('../../config/config.json');

async function createConnection () {
    const sequelize = new Sequelize(config.api.db.database, config.api.db.user, config.api.db.password, {
        host: config.api.db.host,
        dialect: config.api.db.dialect,
        port: config.api.db.port,
        logging: config.api.debug ? consola.log : false,
        define: {
            // prevent sequelize from pluralizing table names
            freezeTableName: true,
            // make sequelize automatically create timestamp columns (created_at & updated_at)
            timestamps: true,
            // automatically convert camelCase table attributes to snake_case
            underscored: true
        }
    });

    // test connection
    await sequelize.authenticate();

    consola.success('Sequelize: Connected to database ' + '\x1B[42m\x1B[30m%s\x1B[0m', config.api.db.database);

    // import sequelize models
    const models = require('../models')({ sequelize });

    // associate models where applicable
    Object.keys(models).forEach((key) => {
        if ('associate' in models[key]) {
            models[key].associate(models);
        }
    });

    // hard sync with database
    await sequelize.sync({ force: true, schema: 'hub', logging: false })

    consola.success('Sequelize: Successfully synced all models.');

    return { sequelize, models }
}

// export
module.exports = createConnection();