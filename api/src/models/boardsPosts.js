module.exports = ({ db, Sequelize }) => {
    db.define('boards_posts', {
        id: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        boardId: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.BOOLEAN,
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