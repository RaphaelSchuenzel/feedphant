module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('board_post_state', {
        stateId: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        hubId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        schema
    });

    Model.associate = function (models) {
        models.BoardPostState.belongsTo(models.BoardPost);
    };

    return Model;
}