module.exports = ({ db, DataTypes }) => {
    db.define('setting', {
        hubId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        stripeCustomerId: {
            type: DataTypes.STRING(2048),
            allowNull: true
        },
        stripeSubscriptionId: {
            type: DataTypes.STRING(2048),
            allowNull: true
        },
        currentPeriodEnds: {
            type: DataTypes.DATE,
            allowNull: true
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