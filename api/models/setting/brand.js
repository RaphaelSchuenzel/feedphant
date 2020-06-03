module.exports = ({ sequelize, Sequelize }) => {
    return sequelize.define('setting_brand', {
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
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
}