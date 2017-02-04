/** General Configurations Like PORT, HOST names and etc... */

const config = {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8889,
    karmaPort: 9876,

    // This part goes to React-Helmet for Head of our HTML
    app: {
        head: {
            title: 'Пингвин Рыба Есть',
            titleTemplate: '%s | Пингвин Рыба Есть',
            meta: [
                { charset: 'utf-8' },
                { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Пингвин Рыба Есть' }
            ],
            link: [
                { rel: 'canonical', href: 'https://korolev.dk/' },
                { type: 'text/css', href: '//fonts.googleapis.com/css?family=Comfortaa:700&subset=latin,cyrillic', rel: 'stylesheet' },
                { type: 'text/css', href: '//fonts.googleapis.com/css?family=Open+Sans:400italic,400,700&subset=cyrillic-ext,latin-ext', rel: 'stylesheet' }
            ]
        }
    }
};

if (process.env.NODE_ENV !== 'production') {
    config.app.head.link.push({ type: 'text/css', href: 'https://s3-eu-west-1.amazonaws.com/graaf/bbc.css?v=0.2.0', rel: 'stylesheet' });
}

module.exports = config;
