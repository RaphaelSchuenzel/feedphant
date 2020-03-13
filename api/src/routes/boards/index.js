'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        boards: require('../../controllers/boards')({ api, db, passport })
    }

    const requests = () => {
        get: {
            // get active boards for a specified hub
            api.get('/boards', controllers.boards.getBoards);
    
            api.get('/boards/:board_id/posts/:limit_from/:limit_to', controllers.boards.getBoardPosts);
    
            // get range of comments for a specified post; fetched on post load client request.
            api.get('/boards/:board_id/posts/:post_id/comments/:limit_from/:limit_to', controllers.boards.getBoardPostComments);
        }
    }

    return requests();
}