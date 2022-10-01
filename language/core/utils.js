import { compileToJs } from './compiler.js'
import { cell, parse } from './parser.js'
import { tokens } from './tokens.js'
import { STD, protolessModule } from '../extentions/extentions.js'
import { languageUtilsString } from './toJs.js'

export const logBoldMessage = msg => console.log('\x1b[1m', msg)
export const logErrorMessage = msg =>
  console.log('\x1b[31m', '\x1b[1m', msg, '\x1b[0m')
export const logSuccessMessage = msg =>
  console.log('\x1b[32m', '\x1b[1m', msg, '\x1b[0m')
export const logWarningMessage = msg =>
  console.log('\x1b[33m', '\x1b[1m', msg, '\x1b[0m')

const findParent = ast => {
  let out = { fn: null, res: null }
  for (const prop in ast)
    if (Array.isArray(ast[prop]))
      for (const arg of ast[prop]) {
        if (arg.type === 'apply') out.fn = arg.operator.name
        const temp = findParent(arg)
        if (temp.res !== undefined) out.res = temp.res
      }
    else if (ast[prop] !== undefined) out.res = ast[prop]
  return out
}

// export const printErrors = (errors, args) => {
//   if (!State.isErrored) {
//     State.isErrored = true
//     if (
//       errors?.message &&
//       (errors.message.includes('Maximum call stack size exceeded') ||
//         errors.message.includes('too much recursion'))
//     )
//       throw new Error('RangeError: Maximum call stack size exceeded')
//     const temp = dfs(args)
//     if (temp.fn || temp.res)
//       throw new Error(
//         errors +
//           ' ( near ' +
//           (temp.res.type === 'value'
//             ? temp.res.value
//             : temp.res.name ?? 'null') +
//           (temp.fn ? ' in function ' + temp.fn + ' )  ' : ' )')
//       )
//     else throw new Error(errors)
//   }
// }
const NoCodeRegExp = /[ ]+(?=[^"]*(?:"[^"]*"[^"]*)*$)+|\n|\t|;;.+/g
export const extractComments = source =>
  source.match(NoCodeRegExp).filter(x => x[0] === ';' && x[1] === ';')
export const removeNoCode = source => source.replace(NoCodeRegExp, '')
export const wrapInBody = source => `..[${source}]`

export const exe = source => {
  const ENV = protolessModule(STD)
  ENV[';;tokens'] = protolessModule(tokens)
  const { result } = cell(ENV)(wrapInBody(source))
  return result
}
export const addSpace = str => str + '\n'
export const isBalancedParenthesis = sourceCode => {
  let count = 0
  const stack = []
  const str = sourceCode.replace(/"(.*?)"/g, '')
  const pairs = { ']': '[' }
  for (let i = 0; i < str.length; i++)
    if (str[i] === '[') stack.push(str[i])
    else if (str[i] in pairs) if (stack.pop() !== pairs[str[i]]) count++
  return { str, diff: count - stack.length }
}
export const handleUnbalancedParens = sourceCode => {
  const parenMatcher = isBalancedParenthesis(sourceCode)
  if (parenMatcher.diff !== 0)
    throw new SyntaxError(
      `Parenthesis are unbalanced by ${parenMatcher.diff > 0 ? '+' : ''}${
        parenMatcher.diff
      } "]"`
    )
}
export const prettier = str =>
  addSpace(
    str
      .replaceAll('];', '];\n')
      .replaceAll(';', '; ')
      .replaceAll('; ;', ';;')
      .replaceAll('[', ' [')
      .replaceAll('|', '| ')
      .replaceAll('| >', '\n|>')
      .replaceAll('.. [', '.. [\n')
      .replaceAll('; :=', ';\n:=')
  )

export const run = source => {
  const sourceCode = removeNoCode(source.toString().trim())
  handleUnbalancedParens(sourceCode)
  return exe(sourceCode)
}

export const encodeUrl = (source, limit = Infinity) => {
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
export const dashCommentsToSemiComments = source =>
  source.replaceAll('//', ';;')
export const handleHangingSemi = source => {
  const code = source.trim()
  return code[code.length - 1] === ';' ? code : code + ';'
}

const treeShake = modules => {
  let LIB = ''
  const dfs = (modules, LIB, LIBRARY) => {
    for (const key in modules) {
      if (key !== 'LIBRARY') {
        LIB += '["' + key + '"]:{'
        for (const method of modules[key]) {
          if (LIBRARY[key]) {
            const current = LIBRARY[key][method]
            if (current) {
              if (typeof current === 'object') {
                LIB += dfs({ [method]: modules[method] }, '', LIBRARY[key])
              } else {
                LIB += '["' + method + '"]:'
                LIB += current.toString()
                LIB += ','
              }
            }
          }
        }
        LIB += '},'
      }
    }
    return LIB
  }
  LIB += 'const LIBRARY = {' + dfs(modules, LIB, STD.LIBRARY) + '}'
  return LIB
}

export const compileHtml = source => {
  const inlined = wrapInBody(removeNoCode(source))
  const { body, modules } = compileToJs(parse(inlined))
  const LIB = treeShake(modules)
  return `<style>body { background: black } </style><body><div id="canvas-container"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/two.js/0.8.10/two.min.js" integrity="sha512-D9pUm3+gWPkv/Wl6vd45vRLjdkdEKGje7BxOxYG0N6m4UlEUB7RSljBwpmJNAOuf6txLLtlaRchoKfzngr/bQg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
const canvasContainer = document.getElementById("canvas-container");
const VOID = null;
${languageUtilsString}
</script>
<script>${LIB}</script>
<script> (() => { ${body} })()</script>
</body>`
}

export const interpredHtml = (source, utils = '../language/core/utils.js') => {
  const inlined = wrapInBody(removeNoCode(source))
  return `<style>body { background: black } </style><body><div id="canvas-container"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/two.js/0.8.10/two.min.js" integrity="sha512-D9pUm3+gWPkv/Wl6vd45vRLjdkdEKGje7BxOxYG0N6m4UlEUB7RSljBwpmJNAOuf6txLLtlaRchoKfzngr/bQg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script type="module">
import { exe } from '${utils}'; 
  try { 
    exe('${inlined}') 
  } catch(err) {
    console.error(err.message) 
  }
</script>
</body>`
}
