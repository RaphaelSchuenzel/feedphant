'use strict';

const BoardsService = require('../services/boards');

exports.getBoards = async (req) => {
    const boards = await BoardsService.getBoards(req.body);

    return boards;
};

exports.getBoard = async (req) => {
    const board = await BoardsService.createHub(req.body);

    return board;
};

exports.getBoardPosts = async (req) => {
    const posts = await BoardsService.getBoardPosts(req.body);

    return posts;
};

exports.getBoardPostComments = async (req) => {
    const comments = await BoardsService.getBoardPostComments(req.body);

    return comments;
};