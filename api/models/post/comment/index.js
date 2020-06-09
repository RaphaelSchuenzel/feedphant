module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('post_comment', {
        postCommentId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
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
        schema
    });

    Model.associate = function (models) {
        models.PostComment.belongsTo(models.Post);
        models.PostComment.hasMany(models.PostCommentVote);
    };

    return Model;
}