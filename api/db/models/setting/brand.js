module.exports = (sequelize, DataTypes) => {
    return sequelize.define('setting_brand', {
        hubId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logoUrl: {
            type: DataTypes.STRING(4096),
            allowNull: true
        },
        iconUrl: {
            type: DataTypes.STRING(4096),
            allowNull: true
        },
        backgroundUrl: {
            type: DataTypes.STRING(4096),
            allowNull: true
        },
        colorsPrimary: {
            type: DataTypes.STRING,
            allowNull: true
        },
        colorsBackground: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
}