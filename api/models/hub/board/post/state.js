module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub_board_post_state', {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.HubBoardPostState.belongsTo(models.HubBoardPost);
    };

    return Model;
}