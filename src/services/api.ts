let app;

if (process.env.BROWSER) {
    const feathers = require('feathers/client');
    const rest = require('feathers-rest/client');
    app = feathers();
    const host = process.env.HOST || 'http://localhost:8889';

    app.configure(rest(host).fetch(fetch));

    if (process.env.NODE_ENV !== 'production') {
        window['app'] = app; // tslint:disable-line
    }
} else {
    app = require('../app/app').default;
}

export {
    app
};
