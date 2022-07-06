module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub_board_post_vote', {
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
        models.HubBoardPostVote.belongsTo(models.HubBoardPost, {
            foreignKey: 'post_id'
        });
    };

    return Model;
}