module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('post_state', {
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
        models.PostState.belongsTo(models.Post);
    };

    return Model;
}