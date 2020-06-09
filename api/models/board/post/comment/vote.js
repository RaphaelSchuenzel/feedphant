module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('board_post_comment_vote', {
        postCommentVoteId: {
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
            allowNull: false,
            defaultValue: true
        }
    }, {
        schema
    });

    Model.associate = function (models) {
        models.BoardPostCommentVote.belongsTo(models.BoardPostComment);
    };

    return Model;
}