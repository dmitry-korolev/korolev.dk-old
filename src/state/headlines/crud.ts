import { crud } from 'utils'

// Models
import { IHeadline } from 'models/headlines'

const headlinesService = crud<IHeadline>({
  serviceName: 'headlines'
})

export {
  headlinesService
}
