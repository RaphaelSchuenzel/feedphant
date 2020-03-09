'use strict';

import HubController from '../../controllers/hubs'

const requests = () => {
    get: {
        api.get('/hub/:hub_url', HubController.getHub);

        // get active boards for a specified hub
        api.get('/hub/:hub_url/boards', HubController.getHubBoards);

        api.get('/hub/:hub_url/boards/:board_id/posts/:limit_from/:limit_to',HubController.getHubBoardPosts);

        // get range of comments for a specified post; fetched on post load client request.
        api.get('/hub/:hub_url/boards/:board_id/posts/:post_id/comments/:limit_from/:limit_to', HubController.getHubBoardPostComments);
    }
}

export default requests;