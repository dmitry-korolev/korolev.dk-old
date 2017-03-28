import { CRUD } from 'utils';

// Models
import { ITag, ITags } from 'models/content';

const tagsService = new CRUD<ITags, ITag>({ serviceName: 'tags' });

export {
    tagsService
}
