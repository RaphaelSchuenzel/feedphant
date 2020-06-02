module.exports = {
    // create a new hub
    create: async (details) => {
        try {
            const hub = await HubModel.create(details);
            
            return module.get(hub.id);
        } catch (err) {

        }
    },

    // get a table column by hub id
    get: async (hubId, { tableName }) => {
        try {
            if (!hubId) {
                throw new Error('Hub ID not specified.');
            }

            const hub = await HubModel.findOne({
                where: {
                    hubId
                },
                attributes: [
                    'hub_id'
                ]
            });

            return hub;
        } catch (err) {

        }
    },

    // update a table column by hub id
    update: async (hubId, details) => {

    }
};