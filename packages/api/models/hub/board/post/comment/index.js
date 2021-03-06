module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub_board_post_comment', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal(`${schema}.uuid_generate_v4()`),
            allowNull: false,
            primaryKey: true,
            unique: true
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
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.HubBoardPostComment.belongsTo(models.HubBoardPost, {
            foreignKey: 'post_id'
        });

        models.HubBoardPostComment.hasMany(models.HubBoardPostCommentVote, {
            foreignKey: 'comment_id'
        });
    };

    return Model;
}