'use strict';

import hubs 		from '../models/hubs'
import boards 	from '../models/boards'

export default {
    getHub: async function (req, res, next) {
        try {
            let hub_domain = req.params.hub_url;

            const hub = await hubs.getHubIdByDomain(hub_domain)
            const response = await hubs.getHubById(hub);

            return res.json(response);
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    getHubBoards: async function (req, res, next) {
        try {
            let hub_domain = req.params.hub_url;

            hubs.getHubIdByDomain(hub_domain)
                .then(function (id) {
                    // query db for exisiting boards
                    db.query(`SELECT * FROM organizations_hubs_boards WHERE hub_id = ` + id, async (error, results, fields) => {
                        try {
                            if (error) throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);

                            // get board contents, respond once completed
                            boards.getBoard(results)
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
                })
                .catch(function (err) {
                    return res.status(err.status).json(err);
                });
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    getHubBoardPosts: async function (req, res, next) {
        try {
            let hub_domain  = req.params.hub_url;
            let board_id	= req.params.board_id;
            let limit 		= { from: req.params.limit_from, to: req.params.limit_to } || { from: 0, to: 20 };

            hubs.getHubIdByDomain(hub_domain)
                .then(function (id) {
                    // query db for exisiting boards
                    db.query(`SELECT * FROM organizations_hubs_boards WHERE hub_id = ${id} AND id = ${board_id}`, async (error, results, fields) => {
                        try {
                            if (error) throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);

                            // get board contents, respond once completed
                            await boards.getBoardPosts(results[0], limit)
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
                })
                .catch(function (err) {
                    return res.status(err.status).json(err);
                });
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    getHubBoardPostComments: async function (req, res, next) {
        try {
            let hub_domain  = req.params.hub_url;
            let board_id	= req.params.board_id;
            let post_id		= req.params.post_id;
            let limit 		= { from: req.params.limit_from, to: req.params.limit_to } || { from: 0, to: 20 };
            
            hubs.getHubIdByDomain(hub_domain)
                .then(function (id) {
                    boards.getPostComments(id, board_id, post_id, limit)
                        .then(function (response) {
                            return res.json(response);
                        })
                        .catch(function (err) {
                            return res.status(err.status).json(err);
                        });
                })
                .catch(function (err) {
                    return res.status(err.status).json(err);
                });
        } catch (err) {
            return res.status(err.status).json(err);
        }
    }
}