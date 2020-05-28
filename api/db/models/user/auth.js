module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_auth', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
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
            allowNull: false,
            unique: true
        },
        refreshToken: {
            type: DataTypes.STRING(4096),
            allowNull: false,
            unique: true
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