import * as debug from 'debug'

// Models
import { IJSONData } from 'models/api'
import { IStore } from 'models/store'

const cache: Map<string, Response | IJSONData> = new Map()
const activeRequests: Map<string, Promise<Response | IJSONData>> = new Map()
const logInfo = debug('k:request:info')
const logError = debug('k:request:error')

export interface IRequestOptions {
  method: string
  baseUrl?: string
  params?: { [K: string]: string }
  useCache?: boolean
  type?: 'json'
  init?: RequestInit
}

const request = (settings: IRequestOptions, store: IStore): Promise<Response | IJSONData> => {
  const { method, baseUrl, useCache = true, type = 'json', init = {} } = settings
  const base = baseUrl || store.application.wpApi
  const url = base + method
  const cacheKey = url + init.method + init.body + type

  if (activeRequests.has(cacheKey)) {
    logInfo('Found active request', url)
    return activeRequests.get(cacheKey)
  }

  if (useCache && cache.has(cacheKey)) {
    logInfo('Found cached request result', url)
    return Promise.resolve(cache.get(cacheKey))
  }

  logInfo('Starting request', url)

  const result = fetch(url, init)
    .then((response: Response) => {
      logInfo('Done request', url)
      activeRequests.delete(cacheKey)

      if (type === 'json') {
        return response.json() as IJSONData
      }

      return response as Response
    })
    .then((response: Response | IJSONData) => {
      if (useCache) {
        cache.set(cacheKey, response)
      }

      return response
    })
    .catch(logError)

  activeRequests.set(cacheKey, result)

  return result
}

export {
  request
}
