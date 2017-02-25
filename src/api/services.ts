import { headlinesService } from './headlines';
import { optionsService } from './options';

const services = (app: any): void => {
    app.use('/api/headlines', headlinesService);
    app.use('/api/options', optionsService);
};

export {
    services
};
