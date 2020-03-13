module.exports = ({ db, Sequelize }) => {
    db.define('users', {
        id: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        avatarUrl: {
            type: Sequelize.STRING(4096),
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