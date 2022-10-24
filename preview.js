import {
  decodeBase64,
  generateCompressedModules,
} from './language/misc/compression.js'
import { compileToJs } from './language/core/compiler.js'
import { treeShake, languageUtilsString } from './language/misc/utils.js'
import { wrapInBody, removeNoCode } from './language/misc/helpers.js'
import { parse } from './language/core/parser.js'
const shortModules = generateCompressedModules()
const encoding = location.href.split('?s=')[1]
const inlined = wrapInBody(removeNoCode(decodeBase64(encoding)))
const { body, modules } = compileToJs(parse(inlined))
const LIBRARY = treeShake(modules)
const script = document.createElement('script')
script.innerHTML = `const canvasContainer =  document.createElement('div')
    canvasContainer.id = 'canvas-container'
    document.body.appendChild(canvasContainer)
    const VOID = null
    const LOGGER = () => () => {}
    ${languageUtilsString}
    ${LIBRARY}
    ${body}
    `
document.body.appendChild(script)
