module.exports = ({ sequelize, Sequelize }) => {
    return sequelize.define('setting', {
        hubId: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        stripeCustomerId: {
            type: Sequelize.STRING(2048),
            allowNull: true
        },
        stripeSubscriptionId: {
            type: Sequelize.STRING(2048),
            allowNull: true,
            unique: true
        },
        currentPeriodEnds: {
            type: Sequelize.DATE,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
}