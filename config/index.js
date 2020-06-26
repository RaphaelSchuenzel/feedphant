const devConfig = require('./dev.json');

const env = process.env;

module.exports = {
	api: {
		port: env.API_PORT || devConfig.api.port,
		bodyLimit: env.API_BODYLIMIT || devConfig.api.bodyLimit,
		corsHeaders: env.API_CORSHEADERS || devConfig.api.corsHeaders,
		debug: env.API_DEBUG || devConfig.api.debug,
		db: {
			host: env.API_DB_HOST || devConfig.api.db.host,
			user: env.API_DB_USER || devConfig.api.db.user,
			password: env.API_DB_PASSWORD || devConfig.api.db.password,
			database: env.API_DB_DATABASE || devConfig.api.db.database,
			dialect: env.API_DB_DIALECT || devConfig.api.db.dialect,
			port: env.API_DB_PORT || devConfig.api.db.port,
			schema: env.API_DB_SCHEMA || devConfig.api.db.schema
		},
		secrets: {
			auth: env.API_SECRETS_AUTH || devConfig.api.secrets.auth,
			session: env.API_SECRETS_SESSION ||devConfig.api.secrets.session
		}
	},
	web: {
		host: env.WEB_HOST || devConfig.web.host,
		port: env.WEB_PORT || devConfig.web.port
	}
};