import { CRUD } from 'utils';

// Models
import { IPage, IPages } from 'models/content';

const pagesService = new CRUD<IPages, IPage>({
    serviceName: 'pages'
});

export {
    pagesService
};
