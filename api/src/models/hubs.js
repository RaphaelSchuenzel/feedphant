'use strict';

const model = {
    getHubIdByDomain: async function (domain) {
        return await new Promise((resolve, reject) => {
            // todo: check if domain is native or custom

            const query = {
                name: 'get-hub-id-by-domain',
                text: `SELECT id FROM organizations_hubs WHERE domain_native = $1`,
                values: [ domain ]
            }

            db.query(query, (err, res) => {
                if (err) {
                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err.stack));
                } else {
                    if (res.rows[0] && res.rows[0].id) {
                        return resolve(res.rows[0].id);
                    } else {
                        return resolve(null);
                    }
                }
            });
        });
    },
    getHubById: async function (domain) {
        return await new Promise((resolve, reject) => {
            const query = {
                name: 'get-hub-by-id',
                text: `SELECT * FROM organizations_hubs WHERE id = $1`,
                values: [ id ]
            }

            db.query(query, (err, res) => {
                if (err) throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, err.stack);

                if (res.rows[0] && res.rows[0].public && res.rows[0].public === 1) {
                    let response = {};

                    response.id 						= res.rows[0].id;
                    response.title 						= res.rows[0].title;
                    response.description 				= res.rows[0].description;
                    response.whitelabel 				= res.rows[0].whitelabel;

                    response.brand 						= {};
                    response.brand.name 				= res.rows[0].brand_name;
                    response.brand.logo_url 			= res.rows[0].brand_logo_url;
                    response.brand.icon_url 			= res.rows[0].brand_icon_url;
                    response.brand.background_url 		= res.rows[0].brand_background_url;

                    response.brand.colors 				= {};
                    response.brand.colors.primary 		= res.rows[0].brand_colors_primary;
                    response.brand.colors.background	= res.rows[0].brand_colors_background;

                    response.domain 					= {};
                    response.domain.native 				= res.rows[0].domain_native;
                    response.domain.custom 				= res.rows[0].domain_custom;

                    response.auth 					    = {};
                    
                    response.auth.sso 				    = {};
                    response.auth.sso.enable            = res.rows[0].auth_sso_enable;
                    response.auth.sso.url               = res.rows[0].auth_sso_url;

                    return resolve(response);
                } else {
                    return resolve({});
                }
            });
        });
    }
};

export default model;