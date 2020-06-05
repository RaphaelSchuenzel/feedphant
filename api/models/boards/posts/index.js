module.exports = ({ sequelize, Sequelize, schema }) => {
    return sequelize.define('board_post', {
        postId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('hub.uuid_generate_v4()'),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        boardId: {
            type: Sequelize.UUID,
            allowNull: false
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
        schema
    });
}