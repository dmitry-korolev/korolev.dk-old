import { IHooks } from 'models/api'

export const combineHooks = (...allHooks: IHooks[]): IHooks => {
  const result: IHooks = {}

  allHooks.forEach((hooks: IHooks) => {
    Object.keys(hooks).forEach((key: string) => {
      result[key] = [
        ...result[key] || [],
        ...hooks[key]
      ]
    })
  })

  return result
}
