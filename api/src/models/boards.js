'use strict';

import user from './user'

const model = {
    getBoard: async function (boards) {
        // fetch data
        return await Promise.all(boards.map(async function(board) {

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
    getBoardPosts: async function (board, limit) {
        // fetch the first X amount of posts within board & return in array
        return await util.db.getRowsByCondition('organizations_hubs_boards_posts', `hub_id = ${board.hub_id} AND board_id = ${board.id} LIMIT ${limit.from}, ${limit.to}`)
            .then(async (response) => {
                // fetch & add additional data before returning fetched posts
                let posts = Promise.all(response.map(async (post) => {

                    // query for & set vote count for post
                    await util.db.getRowCountByCondition('organizations_hubs_boards_posts_votes', `hub_id = ${board.hub_id} AND board_id = ${board.id} AND post_id = ${post.id}`)
                        .then(response => {
                            post.vote_count = response;
                        })
                    
                    // query for & set comment count for post
                    await util.db.getRowCountByCondition('organizations_hubs_boards_posts_comments', `hub_id = ${board.hub_id} AND board_id = ${board.id} AND post_id = ${post.id}`)
                        .then(response => {
                            post.comment_count = response;
                        })
                    
                    // return post once data has been fetched & set
                    return post;
                }));

                // await additional data being set
                return await posts;
            })
    },
    getPostComments: async function (hub, board, post, limit) {
        return await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM organizations_hubs_boards_posts_comments WHERE hub_id = ${hub} AND board_id = ${board} AND post_id = ${post} LIMIT ${limit.from}, ${limit.to}`, async function (error, results, fields) {
                if (error) {
                    reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                } else if (results) {
                    let response = [];

                    await Promise.all(results.map(async (result) => {
                        var comment = {};

                        comment.id          = result.id;
                        comment.content     = result.content;
                        comment.created_at  = result.created_at;
                        comment.updated_at  = result.updated_at;
                        
                        await user.getUser('id', result.owner)
                            .then(response => {
                                comment.owner = response;
                            })

                        if (result.state !== 1) {
                            return false;
                        } else {
                            response.push(comment);
                        }
                    }));

                    return resolve(response);
                } else {
                    return resolve([]);
                }
            });
        });
    }
};

export default model;