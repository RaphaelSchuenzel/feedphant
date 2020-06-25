module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('hub_subscription', {
        stripeCustomerId: {
            type: Sequelize.STRING(2048),
            allowNull: true
        },
        stripeHubHubSubscriptionId: {
            type: Sequelize.STRING(2048),
            allowNull: true,
            unique: true
        },
        currentPeriodEnds: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }, {
        schema,
        paranoid: true
    });

    Model.associate = (models) => {
        models.HubSubscription.belongsTo(models.Hub);
    };

    return Model;
}