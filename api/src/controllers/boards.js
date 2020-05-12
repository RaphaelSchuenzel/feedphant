'use strict';

// controllers
const users = require('./users');

module.exports = ({ api, db, passport }) => ({
    getBoards: (req, res, next) => {
        try {
            /* db.query(`SELECT * FROM organizations_hubs_boards WHERE hub_id = ` + id, async (error, results, fields) => {
                try {
                    if (error) {
                        throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);
                    }

                    // get board contents, respond once completed
                    await module.exports.getBoard(results)
                        .then(function (response) {
                            return res.json(response);
                        })
                        .catch(function (err) {
                            return res.status(err.status).json(err);
                        });
                } catch (err) {
                    return res.status(err.status).json(err);
                }
            }); */
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    getBoard: (boards) => {
        // fetch data
        return Promise.all(boards.map((board) => {
            // get the total count of posts within each board
            
            // todo: replace with sequelize lookup
            /* await util.db.getRowCountByCondition('organizations_hubs_boards_posts', `hub_id = ` + board.hub_id + ` AND board_id = ` + board.id)
                .then(function (response) {
                    board.post_count = response;

                    return board;
                }) */

            const response = {};

            response.created_at = board.created_at;
            response.id = board.id;
            response.title = board.title;
            response.name = board.name;
            response.post_count = board.post_count;
            response.posts = [];
            response.updated_at = board.created_at;

            // return boards with contents
            return response;
        }));
    },
    getBoardPosts: (req, res, next) => {
        try {
            const boardId = req.params.board_id;
            const limit = { from: req.params.limit_from, to: req.params.limit_to } || { from: 0, to: 20 };

            // todo: query db for board posts
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    getBoardPostComments: (req, res, next) => {
        try {
            const boardId	= req.params.board_id;
            const postId		= req.params.post_id;
            const limit 		= { from: req.params.limit_from, to: req.params.limit_to } || { from: 0, to: 20 };

            /* db.query(`SELECT * FROM organizations_hubs_boards_posts_comments WHERE board_id = ${boardId} AND post_id = ${postId} LIMIT ${limit.from}, ${limit.to}`, async function (error, results, fields) {
                if (error) {
                    throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);
                } else {
                    let response = [];

                    await Promise.all(results.map(async (result) => {
                        const comment = {};

                        comment.id = result.id;
                        comment.content = result.content;
                        comment.created_at = result.created_at;
                        comment.updated_at = result.updated_at;
                        
                        await users.getUser('id', result.owner)
                            .then((response) => {
                                comment.owner = response;
                            })

                        if (result.state !== 1) {
                            return false;
                        } else {
                            response.push(comment);
                        }
                    }));

                    return res.json(response);
                }
            }); */
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }
});