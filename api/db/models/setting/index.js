module.exports = (sequelize, DataTypes) => {
    return sequelize.define('setting', {
        hubId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(2048),
            allowNull: true
        },
        whitelabel: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        subdomain: {
            type: DataTypes.STRING,
            allowNull: false
        },
        domain_custom: {
            type: DataTypes.STRING,
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