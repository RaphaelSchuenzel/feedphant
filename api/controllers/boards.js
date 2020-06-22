'use strict';

const BoardsService = require('../services/boards');

exports.getBoards = async (req, res, next) => {
    const boards = await BoardsService.getBoards(req.body);

    return res.json(boards);
};

exports.getBoard = async (req, res, next) => {
    const board = await BoardsService.createHub(req.body);

    return res.json(board);
};

exports.getBoardPosts = async (req, res, next) => {
    const posts = await BoardsService.getBoardPosts(req.body);

    return res.json(posts);
};

exports.getBoardPostComments = async (req, res, next) => {
    const comments = await BoardsService.getBoardPostComments(req.body);

    return res.json(comments);
};