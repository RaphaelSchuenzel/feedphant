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