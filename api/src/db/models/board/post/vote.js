module.exports = ({ db, DataTypes }) => {
    db.define('board_post_vote', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
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