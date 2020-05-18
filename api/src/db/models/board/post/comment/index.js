module.exports = ({ db, DataTypes }) => {
    db.define('board_post_comment', {
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
        content: {
            type: DataTypes.STRING(2048),
            allowNull: false
        },
        hidden: {
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