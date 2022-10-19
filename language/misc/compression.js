import { removeNoCode, wrapInBody } from './helpers.js'
import { ABC, generateCompressedModules } from './utils.js'
import { parse } from '../core/parser.js'
import { LZUTF8 } from '../libs/lz-utf8.js'

export const shortModules = generateCompressedModules()
const dfs = (tree, definitions = new Set(), excludes = new Set()) => {
  for (const node of tree) {
    const { type, operator, args, value } = node
    if (type === 'value' && node.class === 'string') {
      excludes.add(value)
    }
    if (
      type === 'apply' &&
      operator.type === 'word' &&
      args[0]?.name?.length > 2 &&
      args[0].name[0] !== '_'
    ) {
      definitions.add(args[0].name)
    }
    if (Array.isArray(args)) {
      dfs(args, definitions, excludes)
    }
    if (Array.isArray(operator?.args)) {
      dfs(operator.args, definitions, excludes)
    }
  }

  return { definitions, excludes }
}
export const compress = source => {
  const value = removeNoCode(source)
  const AST = parse(wrapInBody(value))
  const { definitions, excludes } = dfs(AST.args)

  excludes.forEach(value => {
    if (definitions.has(value)) definitions.delete(value)
  })

  excludes.clear()
  const defs = [...definitions]
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
    result = result.replaceAll(new RegExp(`\\b${full}\\b`, 'g'), short)

  let index = 0
  let count = 0
  const shortDefinitions = defs
    .sort((a, b) => (a.length > b.length ? 1 : -1))
    .map(full => {
      const short = ABC[index] + count
      ++index
      if (index === ABC.length) {
        index = 0
        ++count
      }
      return { full, short }
    })

  for (const { full, short } of shortDefinitions)
    result = result.replaceAll(new RegExp(`\\b${full}\\b`, 'g'), short)
  return result
}
export const decompress = source => {
  const suffix = [...new Set(source.match(/\'+?\d+/g))]
  let result = suffix.reduce(
    (acc, m) => acc.split(m).join(']'.repeat(parseInt(m.substring(1)))),
    source
  )
  for (const { full, short } of shortModules)
    result = result.replaceAll(new RegExp(`\\b${short}\\b`, 'g'), full)
  return result
}
export const encodeUrl = source =>
  LZUTF8.compress(compress(source).trim(), { outputEncoding: 'Base64' })

export const decodeUrl = source =>
  decompress(
    LZUTF8.decompress(source.trim(), {
      inputEncoding: 'Base64',
      outputEncoding: 'String',
    })
  )
