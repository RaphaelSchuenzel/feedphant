export default ({ app }) => {
    // a bit of a hacky workaround due to nuxt's router scrollBehavior not (seeming) to work properly
    // https://nuxtjs.org/api/configuration-router/#scrollbehavior

    app.router.afterEach((to, from) => {
        const scrollItem = document.getElementById('content-inner');

        if (scrollItem) {
            setTimeout(function () {
                scrollItem.scrollTo(0, 0);
            });
        }
    });
}