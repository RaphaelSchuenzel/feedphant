module.exports = ({ sequelize, DataTypes }) => {
    return sequelize.define('board_post_vote', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        owner: {
            type: DataTypes.UUID,
            allowNull: false
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
}