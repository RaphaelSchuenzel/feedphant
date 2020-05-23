'use strict';

const boards = require('express').Router();

// controllers
const BoardsController = require('../../controllers/boards');

// get boards within hub
boards.route('/')
    .get(BoardsController.getBoards);

// get posts within the specified board; range is selected within url (from - to)
boards.route('/:board_id/posts/:limit_from/:limit_to')
    .get(BoardsController.getBoardPosts);

// get comments for the specified post; range is selected within url (from - to)
boards.route('/:board_id/posts/:post_id/comments/:limit_from/:limit_to')
    .get(BoardsController.getBoardPostComments);

module.exports = boards;