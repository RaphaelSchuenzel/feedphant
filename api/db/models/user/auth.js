module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_auth', {
        id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        adapter: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING(4096),
            allowNull: true
        },
        accessToken: {
            type: DataTypes.STRING(4096),
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING(4096),
            allowNull: false
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