module.exports = ({ sequelize, Sequelize, schema }) => {
    return sequelize.define('board_post_state', {
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
}