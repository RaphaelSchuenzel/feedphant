module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('post', {
        id: {
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
        models.Post.belongsTo(models.Board);
        models.Post.hasMany(models.PostState);
        models.Post.hasMany(models.PostVote);
    };

    return Model;
}