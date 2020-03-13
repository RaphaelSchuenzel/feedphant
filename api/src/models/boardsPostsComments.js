module.exports = ({ db, Sequelize }) => {
    db.define('boards_posts_comments', {
        id: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        boardId: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        postId: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        owner: {
            type: Sequelize.RANGE(Sequelize.INTEGER),
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(2048),
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