module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub_brand', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        logoUrl: {
            type: Sequelize.STRING(4096),
            allowNull: true
        },
        iconUrl: {
            type: Sequelize.STRING(4096),
            allowNull: true
        },
        backgroundUrl: {
            type: Sequelize.STRING(4096),
            allowNull: true
        },
        colorsPrimary: {
            type: Sequelize.STRING,
            allowNull: true
        },
        colorsBackground: {
            type: Sequelize.STRING,
            allowNull: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING(2048),
            allowNull: true
        }
    }, {
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.HubBrand.belongsTo(models.Hub);
    };

    return Model;
}