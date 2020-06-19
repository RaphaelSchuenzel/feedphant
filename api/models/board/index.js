module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub_board', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal(`${schema}.uuid_generate_v4()`),
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
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.Board.belongsTo(models.Hub);
        models.Board.hasMany(models.BoardPost);
    };

    return Model;
}