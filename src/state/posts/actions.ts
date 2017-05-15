import { postsService } from './crud'

/* Async action creators */
const getPosts = postsService.find
const getPost = postsService.get

export {
  getPosts,
  getPost
}
