'use strict';

const boards = require('express').Router();

// controllers
const BoardsController = require('../../controllers/boards');

module.exports = ({ render }) => {
    boards.route('/')
        // get boards within hub
        .get(render(BoardsController.getBoards));

    boards.route('/:board_id/posts/:limit_from/:limit_to')
        // get posts within the specified board; range is selected within url (from - to)
        .get(render(BoardsController.getBoardPosts));

    boards.route('/:board_id/posts/:post_id/comments/:limit_from/:limit_to')
        // get comments for the specified post; range is selected within url (from - to)
        .get(render(BoardsController.getBoardPostComments));

    return boards;
};