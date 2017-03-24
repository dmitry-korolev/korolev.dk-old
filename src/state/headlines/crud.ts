import { CRUD } from 'utils';

// Models
import { IHeadline, IHeadlines } from 'models/headlines';

const { asyncActions, reducer } = new CRUD<IHeadlines, IHeadline>('headlines', { fetch: true });

export {
    asyncActions,
    reducer
}
