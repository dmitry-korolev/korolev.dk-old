import { crud } from 'utils';

// Models
import { ITag } from 'models/tags';

const tagsService = crud<ITag>({
    serviceName: 'tags'
});

export {
    tagsService
}
