module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('post_vote', {
        postVoteId: {
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
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        schema
    });

    Model.associate = function (models) {
        models.PostVote.belongsTo(models.Post);
    };

    return Model;
}