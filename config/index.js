const devConfig = require('./dev_config.json');

const env = process.env;
const nodeEnv = require('../helpers/node_env');

const isProduction = (nodeEnv === 'production');

module.exports = {
	api: {
		port: isProduction ? env.API_PORT : devConfig.api.port,
		bodyLimit: isProduction ? env.API_BODYLIMIT : devConfig.api.bodyLimit,
		corsHeaders: isProduction ? env.API_CORSHEADERS : devConfig.api.corsHeaders,
		debug: isProduction ? env.API_DEBUG : devConfig.api.debug,
		db: {
			host: isProduction ? env.API_DB_HOST : devConfig.api.db.host,
			user: isProduction ? env.API_DB_USER : devConfig.api.db.user,
			password: isProduction ? env.API_DB_PASSWORD : devConfig.api.db.password,
			database: isProduction ? env.API_DB_DATABASE : devConfig.api.db.database,
			dialect: isProduction ? env.API_DB_DIALECT : devConfig.api.db.dialect,
			port: isProduction ? env.API_DB_PORT : devConfig.api.db.port,
			schema: isProduction ? env.API_DB_SCHEMA : devConfig.api.db.schema
		},
		secrets: {
			auth: isProduction ? env.API_SECRETS_AUTH : devConfig.api.secrets.auth,
			session: isProduction ? env.API_SECRETS_SESSION : devConfig.api.secrets.session
		}
	},
	web: {
		host: isProduction ? env.WEB_HOST : devConfig.web.host,
		port: isProduction ? env.WEB_PORT : devConfig.web.port
	}
};