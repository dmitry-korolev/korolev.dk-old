import { crud } from 'utils';

// Models
import { IPage } from 'models/pages';

const pagesService = crud<IPage>({
    serviceName: 'pages'
});

export {
    pagesService
};
