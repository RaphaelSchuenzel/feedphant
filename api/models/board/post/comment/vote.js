module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('board_post_comment_vote', {
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
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.BoardPostCommentVote.belongsTo(models.BoardPostComment);
    };

    return Model;
}