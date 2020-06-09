module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('board_post', {
        postId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hidden: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        schema
    });

    Model.associate = function (models) {
        models.BoardPost.belongsTo(models.Board);
        models.BoardPost.hasMany(models.BoardPostState);
        models.BoardPost.hasMany(models.BoardPostVote);
    };

    return Model;
}