module.exports = ({ sequelize, Sequelize, schema }) => {
    return sequelize.define('index', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        public: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING(2048),
            allowNull: true
        },
        whitelabel: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        subdomain: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        domain_custom: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        }
    }, {
        schema
    });
}