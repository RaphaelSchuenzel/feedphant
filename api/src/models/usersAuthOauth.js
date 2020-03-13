module.exports = ({ db, Sequelize }) => {
    db.define('users_auth_oauth', {
        id: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        userId: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        provider: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accessToken: {
            type: Sequelize.STRING(4096),
            allowNull: false
        },
        refreshToken: {
            type: Sequelize.STRING(4096),
            allowNull: false
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