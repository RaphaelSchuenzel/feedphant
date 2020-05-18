module.exports = ({ db, Sequelize }) => {
    db.define('user_auth', {
        id: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        userId: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
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