module.exports = ({ sequelize, Sequelize, schema }) => {
    return sequelize.define('board_post_vote', {
        postVoteId: {
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
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        schema
    });
}