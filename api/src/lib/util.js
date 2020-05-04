
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
        getRowCountByCondition: (table, condition) => {
            return new Promise((resolve, reject) => {
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
        }
    }
}

module.exports = util;