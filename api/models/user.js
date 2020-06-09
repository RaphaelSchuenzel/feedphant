module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatarUrl: {
            type: Sequelize.STRING(4096),
            allowNull: true
        }
    }, {
        schema
    });

    Model.associate = function (models) {
        models.User.belongsTo(models.Hub);
        models.User.hasOne(models.Auth);
    };

    return Model;
}