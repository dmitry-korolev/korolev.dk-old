import { crud } from 'utils'

// Models
import { IPost } from 'models/posts'

const postsService = crud<IPost>({
  serviceName: 'posts'
})

export {
  postsService
}
