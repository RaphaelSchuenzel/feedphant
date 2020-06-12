module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('auth', {
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
        models.Auth.belongsTo(models.User);
    };

    return Model;
}