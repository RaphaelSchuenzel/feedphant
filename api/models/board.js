module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('board', {
        boardId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        schema
    });

    Model.associate = function (models) {
        models.Board.belongsTo(models.Hub);
        models.Board.hasMany(models.Post);
    };

    return Model;
}