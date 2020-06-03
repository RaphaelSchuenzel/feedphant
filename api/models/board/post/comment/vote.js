module.exports = ({ sequelize, Sequelize }) => {
    return sequelize.define('board_post_comment_vote', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        commentId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        owner: {
            type: Sequelize.UUID,
            allowNull: false
        },
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
}