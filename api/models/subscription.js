module.exports = ({ sequelize, Sequelize, schema }) => {
    const Model = sequelize.define('subscription', {
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
        schema,
        paranoid: true
    });

    Model.associate = function (models) {
        models.Subscription.belongsTo(models.Hub);
    };

    return Model;
}