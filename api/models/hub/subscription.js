module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('index_subscription', {
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
        }
    }, {
        schema
    });

    Model.associate = function (models) {
        models.HubSubscription.belongsTo(models.Hub);
    };

    return Model;
}