'use strict';

import BoardsService from '../services/board'

module.exports = {
    getBoards: async (req, res, next) => {
        const boards = await BoardsService.getBoards(req.body);

        return res.json(boards);
    },
    getBoard: async (req, res, next) => {
        const board = await BoardsService.createHub(req.body);

        return res.json(board);
    },
    getBoardPosts: async (req, res, next) => {
        const posts = await BoardsService.getBoardPosts(req.body);

        return res.json(posts);
    },
    getBoardPostComments: async (req, res, next) => {
        const comments = await BoardsService.getBoardPostComments(req.body);

        return res.json(comments);
    }
};