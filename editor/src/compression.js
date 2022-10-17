import { removeNoCode } from '../../language/misc/helpers.js'
import { generateCompressedModules } from '../../language/misc/utils.js'

export const shortModules = generateCompressedModules()
export const encodeUrl = source => {
  const value = removeNoCode(source)
  let { result, occurance } = value
    .split('];]')
    .join(']]')
    .split('')
    .reduce(
      (acc, item) => {
        if (item === ']') acc.occurance++
        else {
          if (acc.occurance === 1) {
            acc.result += ']'
            acc.occurance = 0
          } else if (acc.occurance > 1) {
            acc.result += "'" + acc.occurance
            acc.occurance = 0
          }
          acc.result += item
        }
        return acc
      },
      { result: '', occurance: 0 }
    )
  if (occurance > 0) result += "'" + occurance

  for (const { full, short } of shortModules)
    result = result
      .replaceAll(full + '[', short + '[')
      .replaceAll('[' + full + ']', '[' + short + ']')
      .replaceAll(`"${full}"`, `"${short}"`)
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
    result = result
      .replaceAll(short + '[', full + '[')
      .replaceAll('[' + short + ']', '[' + full + ']')
      .replaceAll(`"${short}"`, `"${full}"`)
  return result
}
