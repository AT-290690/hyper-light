import { removeNoCode } from './helpers.js'
import LZUTF8 from 'lzutf8'
import { generateCompressedModules } from './utils.js'

export const shortModules = generateCompressedModules()

export const encodeUrl = source => {
  const value = removeNoCode(source)
  let { result, count } = value
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
  if (count > 0) result += "'" + count

  for (const { full, short } of shortModules) {
    if (result.includes(full + '[')) {
      result = result.replaceAll(full + '[', short + '[')
      result = result.replaceAll(`"${full}"`, `"${short}"`)
    }
  }

  const encoded = LZUTF8.compress(result.trim(), {
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
  let result = suffix.reduce(
    (acc, m) => acc.split(m).join(']'.repeat(parseInt(m.substring(1)))),
    value
  )
  for (const { full, short } of shortModules)
    if (result.includes(short + '[')) {
      result = result.replaceAll(short + '[', full + '[')
      result = result.replaceAll(`"${short}"`, `"${full}"`)
    }

  return result
}
