module.exports = ({ sequelize, Sequelize }) => {
    return sequelize.define('setting', {
        hubId: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        public: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(2048),
            allowNull: true
        },
        whitelabel: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        subdomain: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        domain_custom: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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