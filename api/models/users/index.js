module.exports = ({ sequelize, Sequelize, schema }) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        hubId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        avatarUrl: {
            type: Sequelize.STRING(4096),
            allowNull: true
        }
    }, {
        schema
    });
}