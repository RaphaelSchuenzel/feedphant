module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('board_post_comment', {
        postCommentId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        postId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        owner: {
            type: Sequelize.UUID,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(4096),
            allowNull: false
        },
        hidden: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        schema
    });

    Model.associate = function (models) {
        models.BoardPostComment.belongsTo(models.BoardPost);
        models.BoardPostComment.hasMany(models.BoardPostCommentVote);
    };
}