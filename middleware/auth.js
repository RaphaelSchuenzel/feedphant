export default function ({ store, error }) {
    if (!store.state.session.authenticated) {
        error({
            message: 'Unauthorized',
            statusCode: 403
        })
    }
}