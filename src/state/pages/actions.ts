import { pagesService } from './crud'

/* Async action creators */
const getPages = pagesService.find
const getPage = pagesService.get

export {
  getPages,
  getPage
}
