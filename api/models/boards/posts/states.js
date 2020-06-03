module.exports = ({ sequelize, Sequelize }) => {
    return sequelize.define('board_post_state', {
        id: {
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
    });
}