import { removeNoCode } from './helpers.js'
import LZUTF8 from 'lzutf8'
export const encodeUrl = source => {
  const value = removeNoCode(source)
  const out = value
    .split('];]')
    .join(']]')
    .split('')
    .reduce(
      (acc, item) => {
        if (item === ']') acc.count++
        else {
          if (acc.count === 1) {
            acc.result += ']'
            acc.count = 0
          } else if (acc.count > 1) {
            acc.result += "'" + acc.count
            acc.count = 0
          }
          acc.result += item
        }
        return acc
      },
      { result: '', count: 0 }
    )
  if (out.count > 0) out.result += "'" + out.count
  const encoded = LZUTF8.compress(out.result.trim(), {
    outputEncoding: 'Base64',
  })

  return encoded
}
export const decodeUrl = url => {
  const value = LZUTF8.decompress(url, {
    inputEncoding: 'Base64',
    outputEncoding: 'String',
  }).trim()
  const suffix = [...new Set(value.match(/\'+?\d+/g))]
  const matcher = suffix.reduce(
    (acc, m) => acc.split(m).join(']'.repeat(parseInt(m.substring(1)))),
    value
  )
  return matcher
}
