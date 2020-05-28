module.exports = ({ sequelize, DataTypes }) => {
    return sequelize.define('setting', {
        hubId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        stripeCustomerId: {
            type: DataTypes.STRING(2048),
            allowNull: true
        },
        stripeSubscriptionId: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            unique: true
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