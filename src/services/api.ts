let app;

if (process.env.BROWSER) {
    const feathers = require('feathers/client');
    const hooks = require('feathers-hooks');
    const rest = require('feathers-rest/client');
    const authentication = require('feathers-authentication/client');

    app = feathers();
    const host = process.env.HOST || 'http://localhost:8889';

    app
        .configure(rest(host).fetch(fetch))
        .configure(hooks())
        .configure(authentication());
} else {
    app = require('../app/app').default;
}

export {
    app
};
