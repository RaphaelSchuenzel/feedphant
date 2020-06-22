module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub_board_post', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal(`${schema}.uuid_generate_v4()`),
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
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.BoardPost.belongsTo(models.Board, {
            foreignKey: 'board_id'
        });

        models.BoardPost.hasMany(models.BoardPostState, {
            foreignKey: 'post_id'
        });
        
        models.BoardPost.hasMany(models.BoardPostVote, {
            foreignKey: 'post_id'
        });
    };

    return Model;
}