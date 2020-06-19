module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('user_auth', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal(`${schema}.uuid_generate_v4()`),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        adapter: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hash: {
            type: Sequelize.STRING(4096),
            allowNull: true
        },
        accessToken: {
            type: Sequelize.STRING(4096),
            allowNull: false,
            unique: true
        },
        refreshToken: {
            type: Sequelize.STRING(4096),
            allowNull: false,
            unique: true
        }
    }, {
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.UserAuth.belongsTo(models.User);
    };

    return Model;
}