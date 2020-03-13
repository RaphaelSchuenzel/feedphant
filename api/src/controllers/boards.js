'use strict';

// controllers
const users = require('./users');

module.exports = ({ api, db, passport }) => ({
    getBoards: async function (req, res, next) {
        try {
            db.query(`SELECT * FROM organizations_hubs_boards WHERE hub_id = ` + id, async (error, results, fields) => {
                try {
                    if (error) throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);

                    console.log("called")

                    // get board contents, respond once completed
                    await getBoard(results)
                        .then(function (response) {
                            return res.json(response);
                        })
                        .catch(function (err) {
                            return res.status(err.status).json(err);
                        });
                } catch (err) {
                    return res.status(err.status).json(err);
                }
            });
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    getBoard: async function (boards) {
        // fetch data
        return await Promise.all(boards.map(async function(board) {

            console.log("called")

            // get the total count of posts within each board
            await util.db.getRowCountByCondition('organizations_hubs_boards_posts', `hub_id = ` + board.hub_id + ` AND board_id = ` + board.id)
                .then(function (response) {
                    board.post_count = response;

                    return board = board;
                })

            let response = {};

            response.created_at 				= board.created_at;
            response.id 						= board.id;
            response.title 						= board.title;
            response.name 				        = board.name;
            response.post_count 				= board.post_count;
            response.posts                      = [];
            response.updated_at 				= board.created_at;

            // return boards with contents
            return response;
        }));
    },
    getBoardPosts: async function (req, res, next) {
        try {
            let board_id	= req.params.board_id;
            let limit 		= { from: req.params.limit_from, to: req.params.limit_to } || { from: 0, to: 20 };

            // todo: query db for board posts
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    getBoardPostComments: async function (req, res, next) {
        try {
            let board_id	= req.params.board_id;
            let post_id		= req.params.post_id;
            let limit 		= { from: req.params.limit_from, to: req.params.limit_to } || { from: 0, to: 20 };

            db.query(`SELECT * FROM organizations_hubs_boards_posts_comments WHERE board_id = ${board_id} AND post_id = ${post_id} LIMIT ${limit.from}, ${limit.to}`, async function (error, results, fields) {
                if (error) {
                    throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);
                } else {
                    let response = [];

                    await Promise.all(results.map(async (result) => {
                        var comment = {};

                        comment.id          = result.id;
                        comment.content     = result.content;
                        comment.created_at  = result.created_at;
                        comment.updated_at  = result.updated_at;
                        
                        await users.getUser('id', result.owner)
                            .then(response => {
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
            });
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }
});