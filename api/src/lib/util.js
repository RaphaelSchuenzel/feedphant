
'use strict';

const util = {
    db: {
        /**	
		 *  Queries a specified table for count of rows with a specified condition.
		 *	@param {string} table			Table within DB to access
		 *	@param {string} condition		Condition to query table for
		 *
		 *	@example
		 *		getRowCountByCondition('table_1', `row_id = 1`)
		 *			.then(response => {
		 *				console.log(response);
		 *			})
		 */
        getRowCountByCondition: async function (table, condition) {
            return await new Promise((resolve, reject) => {
                db.query(`SELECT COUNT(*) FROM ${table} WHERE ${condition}`, function (error, results, fields) {
                    if (error) {
                        return reject(error);
                    } else if (results) {
                        return resolve(results[0]['COUNT(*)']);
                    } else {
                        return resolve([]);
                    }
                });
            });
        },

        /**	
         *  Retrieve a specific amount of posts within a specified hub board.
         *	@param {string} hub			Hub ID within which to look up the board
            *	@param {string} board		Board ID to look up
            *	@param {string} start		First post item to select
            *	@param {string} end			Last post item to select
            */
        getRowsByCondition: async function (table, condition) {
            return await new Promise((resolve, reject) => {
                db.query(`SELECT * FROM ${table} WHERE ${condition}`, function (error, results, fields) {
                    if (error) {
                        return reject(error);
                    } else if (results) {
                        return resolve(results);
                    } else {
                        return resolve([]);
                    }
                });
            });
        }
    }
}

global.util = util;

export default util;