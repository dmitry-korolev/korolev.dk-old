import * as leftPad from 'left-pad'

import { curry } from 'utils/ramda'
import { replace } from './replace'

type IFormatter = string

const dateFormat = curry((formatter: IFormatter, _date: Date | string): string => {
  const date = typeof _date === 'string' ? new Date(_date) : _date

  const YYYY = `${date.getUTCFullYear()}`
  const YY = YYYY.slice(2)
  const M = `${date.getUTCMonth() + 1}`
  const MM = leftPad(M, 2, '0')
  const D = `${date.getUTCDate()}`
  const DD = leftPad(D, 2, '0')
  const h = `${date.getUTCHours()}`
  const hh = leftPad(h, 2, '0')
  const m = `${date.getUTCMinutes()}`
  const mm = leftPad(m, 2, '0')
  const s = `${date.getUTCSeconds()}`
  const ss = leftPad(s, 2, '0')

  return replace(formatter, {
    YYYY,
    YY,
    MM,
    M,
    DD,
    D,
    hh,
    h,
    mm,
    m,
    ss,
    s
  })
})

export {
  dateFormat
}
