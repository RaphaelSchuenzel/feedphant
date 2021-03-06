module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub_user', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal(`${schema}.uuid_generate_v4()`),
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
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.HubUser.belongsTo(models.Hub);

        models.HubUser.hasMany(models.HubUserAuth, {
            foreignKey: 'user_id'
        });
    };

    return Model;
}