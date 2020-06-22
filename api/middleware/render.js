module.exports = (controller) => {
    return (req, res, next) => {
        try {
            res.json(controller(req))
        } catch (err) {
            // todo: handle error
            res.json('error')
        }
    }
}