import { removeNoCode, wrapInBody } from './helpers.js'
import { ABC, generateCompressedModules } from './utils.js'
import { parse } from '../core/parser.js'
import { LZUTF8 } from '../libs/lz-utf8.js'

export const shortModules = generateCompressedModules()
const dfs = (tree, definitions = new Set()) => {
  for (const node of tree) {
    const { type, operator, args } = node
    if (
      type === 'apply' &&
      operator.type === 'word' &&
      operator.name === ':=' &&
      args[0].name.length > 3
    ) {
      definitions.add(args[0].name)
    }
    if (Array.isArray(args)) {
      dfs(args, definitions)
    }
    if (Array.isArray(operator?.args)) {
      dfs(operator.args, definitions)
    }
  }

  return definitions
}

export const encodeUrl = source => {
  const value = removeNoCode(source)
  const AST = parse(wrapInBody(value))

  const definitions = [...dfs(AST.args)]
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

  let index = 0
  let count = 0
  const shortDefinitions = definitions
    .sort((a, b) => (a.length > b.length ? 1 : -1))
    .map(full => {
      const short = ABC[index] + '_' + count
      ++index
      if (index === ABC.length) {
        index = 0
        ++count
      }
      return { full, short }
    })
  for (const { full, short } of shortDefinitions)
    result = result.replaceAll(new RegExp(`\\b${full}\\b`, 'g'), short)

  const encoded = LZUTF8.compress(result.trim(), { outputEncoding: 'Base64' })

  return encoded
}

export const decodeUrl = url => {
  const value = LZUTF8.decompress(url.trim(), {
    inputEncoding: 'Base64',
    outputEncoding: 'String',
  })
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
