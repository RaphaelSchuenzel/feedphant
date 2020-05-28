module.exports = (sequelize, DataTypes) => {
    return sequelize.define('setting', {
        hubId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
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
            allowNull: false,
            unique: true
        },
        domain_custom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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