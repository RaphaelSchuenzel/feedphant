module.exports = ({ db, Sequelize }) => {
    db.define('users_auth_password', {
        id: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        userId: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        hash: {
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