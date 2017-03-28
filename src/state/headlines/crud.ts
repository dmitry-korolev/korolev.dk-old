import { CRUD } from 'utils';

// Models
import { IHeadline, IHeadlines } from 'models/headlines';

const headlinesService = new CRUD<IHeadlines, IHeadline>({
    serviceName: 'headlines'
});

export {
    headlinesService
}
