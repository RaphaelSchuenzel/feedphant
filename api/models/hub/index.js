module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal(`${schema}.uuid_generate_v4()`),
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
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.Hub.hasOne(models.Subscription);
        models.Hub.hasOne(models.HubBrand);
        models.Hub.hasMany(models.Board);
        models.Hub.hasMany(models.User);
    };

    return Model;
}