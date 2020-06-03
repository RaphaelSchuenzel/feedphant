module.exports = ({ sequelize, Sequelize }) => {
    return sequelize.define('user_auth', {
        userId: {
            type: Sequelize.UUID,
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
    });
}