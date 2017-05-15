import {
  pipe,
  sort,
  descend,
  prop,
  map
} from 'utils/ramda'

const idP = prop('_id')
export const mapItemsToIds = pipe(
  sort(descend(pipe(
    prop('_created'),
    Date.parse
  ))),
  map(idP)
)
