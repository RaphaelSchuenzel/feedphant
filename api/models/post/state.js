module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('post_state', {
        stateId: {
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
        schema
    });

    Model.associate = function (models) {
        models.PostState.belongsTo(models.Post);
    };

    return Model;
}