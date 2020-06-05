module.exports = ({ sequelize, Sequelize, schema }) => {
    return sequelize.define('index_brand', {
        hubId: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
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
        schema
    });
}