import { headlinesService } from './headlines';

const services = (app: any): void => {
    app.use('/api/headlines', headlinesService);
};

export {
    services
};
