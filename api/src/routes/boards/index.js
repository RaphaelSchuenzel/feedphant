'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        boards: require('../../controllers/boards')({ api, db, passport })
    }

    // requests
    
    // GET

    // get boards within hub
    api.get('/boards', controllers.boards.getBoards);

    // get posts within the specified board; range is selected within url (from - to)
    api.get('/boards/:board_id/posts/:limit_from/:limit_to', controllers.boards.getBoardPosts);

    // get comments for the specified post; range is selected within url (from - to)
    api.get('/boards/:board_id/posts/:post_id/comments/:limit_from/:limit_to', controllers.boards.getBoardPostComments);

    return api;
}