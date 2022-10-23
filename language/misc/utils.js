import { compileToJs } from '../core/compiler.js'
import { cell, parse } from '../core/parser.js'
import { tokens } from '../core/tokens.js'
import { STD, protolessModule, TWO_JS_HTML } from '../extentions/extentions.js'
import { removeNoCode, wrapInBody } from './helpers.js'

export const languageUtilsString = `const _tco = func => (...args) => { let result = func(...args); while (typeof result === 'function') { result = result(); }; return result };
const _pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const _node = (...args) => { const [val, ...rest] = args; return { '*': val, '=>': rest ? rest.map(args => _node(args)) : VOID }}
const _spread = (items) => Array.isArray(items[0]) ? items.reduce((acc, item) => [...acc, ...item], []) : items.reduce((acc, item) => ({ ...acc, ...item }), {});
const _scanLeft = (array, callback) => { for (let i = 0; i < array.length; ++i) callback(array[i], i) ;return array } 
const _scanRight = (array, callback) => {  for (let i = array.length - 1; i >= 0; --i) callback(array[i], i) ;return array }
const call = (x, fn) => fn(x); 
const printout = (...args) => console.log(...args);
const protolessModule = methods => { const env = Object.create(null); for (const method in methods) env[method] = methods[method]; return env;};`

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

export const runFromText = source => run(removeNoCode(source))

export const exe = source => {
  const ENV = protolessModule(STD)
  ENV[';;tokens'] = protolessModule(tokens)
  const { result } = cell(ENV)(wrapInBody(source))
  return result
}
export const isBalancedParenthesis = sourceCode => {
  let count = 0
  const stack = []
  const str = sourceCode.replace(/"(.*?)"/g, '')
  const pairs = { ']': '[' }
  for (let i = 0; i < str.length; ++i)
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

export const run = source => {
  const sourceCode = removeNoCode(source.toString().trim())
  handleUnbalancedParens(sourceCode)
  return exe(sourceCode)
}

export const dashCommentsToSemiComments = source =>
  source.replaceAll('//', ';;')
export const handleHangingSemi = source => {
  const code = source.trim()
  return code[code.length - 1] === ';' ? code : code + ';'
}

export const treeShake = modules => {
  let lib = ''
  const dfs = (modules, lib, LIBRARY) => {
    for (const key in modules) {
      if (key !== 'LIBRARY' && modules[key] !== undefined) {
        lib += '["' + key + '"]:{'
        for (const method of modules[key]) {
          if (LIBRARY[key]) {
            const current = LIBRARY[key][method]
            if (current) {
              if (typeof current === 'object') {
                lib += dfs({ [method]: modules[method] }, '', LIBRARY[key])
              } else {
                lib += '["' + method + '"]:'
                lib += current.toString()
                lib += ','
              }
            }
          }
        }
        lib += '},'
      }
    }
    return lib
  }
  lib += 'const LIBRARY = {' + dfs(modules, lib, STD.LIBRARY) + '}'
  return lib
}

export const compileModule = source => {
  const inlined = wrapInBody(removeNoCode(source))
  const { body, modules } = compileToJs(parse(inlined))
  const lib = treeShake(modules)
  return `const VOID = null;
${languageUtilsString}
${lib}
${body}`
}

export const compileHtml = (source, scripts = '') => {
  const inlined = wrapInBody(removeNoCode(source))
  const { body, modules } = compileToJs(parse(inlined))
  const lib = treeShake(modules)
  return `
<style>body { background: black } </style><body>
${scripts}
<script>
const VOID = null;
${languageUtilsString}
</script>
<script>${lib}</script>
<script> (() => { ${body} })()</script>
</body>`
}

export const interpredHtml = (
  source,
  utils = '../language/misc/utils.js',
  scripts = TWO_JS_HTML
) => {
  const inlined = wrapInBody(removeNoCode(source))
  return `<style>body { background: black } </style>
  ${scripts}
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
export const abc = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  // 'а',
  // 'б',
  // 'в',
  // 'г',
  // 'д',
  // 'е',
  // 'ж',
  // 'з',
  // 'и',
  // 'й',
  // 'к',
  // 'л',
  // 'м',
  // 'н',
  // 'о',
  // 'п',
  // 'р',
  // 'с',
  // 'т',
  // 'щ',
  // 'ц',
  // 'ч',
  // 'ь',
  // 'ю',
  // 'я',
  // 'А',
  // 'Б',
  // 'В',
  // 'Г',
  // 'Д',
  // 'Е',
  // 'Ж',
  // 'З',
  // 'И',
  // 'Й',
  // 'К',
  // 'Л',
  // 'М',
  // 'Н',
  // 'О',
  // 'П',
  // 'Р',
  // 'С',
  // 'Т',
  // 'Щ',
  // 'Ц',
  // 'Ч',
  // 'Ю',
  // 'Я',
]
export const ABC = [...abc]
export const generateCompressedModules = () => {
  const { NAME, ...lib } = STD.LIBRARY
  const modules = new Set([NAME])
  const dfs = (lib, modules) => {
    for (const module in lib) {
      if (module.length > 2) modules.add(module)
      for (const m in lib[module]) {
        if (lib[module][m].NAME) dfs(lib[module][m], modules)
        if (m !== 'NAME' && m.length > 2) modules.add(m)
      }
    }
  }
  dfs(lib, modules)
  let index = 0
  let count = 0
  return [...modules]
    .sort((a, b) => (a.length > b.length ? 1 : -1))
    .map(full => {
      const short = count + abc[index]
      ++index
      if (index === abc.length) {
        index = 0
        ++count
      }
      return { full, short }
    })
}
