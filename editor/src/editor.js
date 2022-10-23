import { CodeMirror } from '../cell.editor.bundle.js'
import { compile, interpred } from './utils.js'
import { compress, encodeBase64 } from '../../language/misc/compression.js'
import { STD, TWO_JS_HTML } from '../../language/extentions/extentions.js'
import { VOID } from '../../language/core/tokens.js'
import { LZUTF8 } from '../../language/libs/lz-utf8.js'
import { removeNoCode } from '../../language/misc/helpers.js'

export const HyperLightEditor = (
  parent,
  { elements, onResize, onPopupResize, initialValue }
) => {
  const editor = CodeMirror(parent)
  onResize(editor)
  if (initialValue !== undefined) editor.setValue(initialValue)
  const logErrorMessage = msg => {
    elements.popupContainer.style.display = 'none'
    elements.canvasContainer.style.display = 'none'
    elements.consoleElement.textContent = msg
  }
  // const urlSearchParams = new URLSearchParams(window.location.search)
  // const intilal = urlSearchParams.get('r')
  // const [, ...encoding] = location.href.split('?r=')
  // const intilal = encoding.join('').trim()

  const createPopUp = () => {
    elements.popupContainer.innerHTML = ''
    const popup = CodeMirror(elements.popupContainer)
    elements.popupContainer.style.display = 'block'
    return popup
  }

  const popUp = (
    popup,
    msg,
    w = window.innerWidth / 2 - 5,
    h = window.innerHeight / 3
  ) => {
    popup.setSize(w, h)
    popup.setValue(msg)
  }

  STD.IMP = module => {
    const pop = createPopUp()
    popUp(
      pop,
      `<- [${Object.keys(module)
        .filter(x => x !== 'NAME')
        .map(x => `"${x}"`)
        .join(';')}] [${module.NAME}];\n`,
      window.innerWidth * 1 - 20
    )
    pop.focus()
  }
  STD.COMPACT = str => removeNoCode(str)
  STD.COMPRESS = str => compress(str)
  STD.TOBASE64 = str => LZUTF8.compress(str, { outputEncoding: 'Base64' })
  STD.FROMBINARYSTRING = str =>
    LZUTF8.decompress(str, {
      inputEncoding: 'StorageBinaryString',
      outputEncoding: 'String',
    })
  STD.FROMBASE64 = str =>
    LZUTF8.decompress(str, {
      inputEncoding: 'Base64',
      outputEncoding: 'String',
    })
  STD.TOBINARYSTRING = str =>
    LZUTF8.compress(str, { outputEncoding: 'StorageBinaryString' })
  STD.LOGGER = (disable = 0, showCount = 1) => {
    if (disable) return (msg, count) => {}
    // if (!!editor.getLine(editor.lineCount() - 1).trim()) {
    //   editor.addValue('\n'.repeat(window.innerHeight / 50))
    //   editor.setCursor(
    //     editor.posToOffset({ line: editor.lineCount() - 1, ch: 0 }),
    //     true
    //   )
    // }
    const popup = createPopUp()
    onPopupResize(popup)
    let count = 0
    return (msg, comment = '', space) => {
      let top = ''
      if (showCount) {
        const current = popup.getValue()
        top = `${current ? current + '\n' : ''};; ${count++} ${comment}\n`
      }

      popup.setValue(
        `${top}${
          msg !== VOID
            ? typeof msg === 'string'
              ? `"${msg}"`
              : typeof msg === 'function'
              ? '-> []'
              : JSON.stringify(msg, null, space)
                  .replaceAll('[', '.: [')
                  .replaceAll('{', ':: [')
                  .replaceAll('}', ']')
                  .replaceAll(',', '; ')
                  .replaceAll('":', '"; ')
                  .replaceAll('null', 'void')
                  .replaceAll('undefined', 'void')
            : 'void'
        }`
      )
      popup.setCursor(
        popup.posToOffset({ ch: 0, line: popup.lineCount() - 1 }),
        true
      )
      return msg
    }
  }

  const updateApp = () => {
    const appDocument = elements.app.contentWindow.document
    appDocument.write(compile(editor.getValue(), TWO_JS_HTML, logErrorMessage))
  }
  const openAppWindow = e => {
    elements.openAppButton.style.display = 'none'
    elements.openEditorButton.style.display = 'block'
    elements.consoleElement.textContent = ''
    elements.app.style.display = 'block'
    elements.canvasContainer.style.display = 'block'
    updateApp()
  }
  const openEditor = e => {
    elements.openEditorButton.style.display = 'none'
    elements.openAppButton.style.display = 'block'
    elements.app.style.display = 'none'
    elements.canvasContainer.style.display = 'none'
    elements.app.src = ''
    elements.consoleElement.textContent = ''
  }
  elements.openEditorButton.addEventListener('click', openEditor)
  elements.openAppButton.addEventListener('click', openAppWindow)
  elements.key.addEventListener('click', () => {
    const encoded = encodeBase64(editor.getValue())
    // const link = location.href.includes('https://at-290690.github.io/hyper-light')
    // ? 'https://at-290690.github.io/hyper-light/preview.html?s='
    // : 'http://127.0.0.1:8080/preview.html?s='
    const link = 'https://at-290690.github.io/hyper-light/preview.html?s='
    if (encoded) window.open(link + encoded, '_blank').focus()
  })
  window.addEventListener('resize', () => onResize(editor))
  const runCodeEvent = () => {
    if (elements.app.style.display === 'block') {
      elements.app.src = ''
      setTimeout(updateApp, 250)
    } else {
      elements.canvasContainer.style.display = 'none'
      return interpred(editor.getValue(), logErrorMessage)
    }
  }
  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      e.stopPropagation()
      elements.consoleElement.textContent = ''
      elements.popupContainer.innerHTML = ''
      runCodeEvent()
    }
  })
  elements.run.addEventListener('click', () => {
    const source = editor.getValue()
    editor.setValue(source.trim())
    const result = runCodeEvent()
    if (result !== undefined) {
      STD.LOGGER(0, 0)(interpred(source, logErrorMessage))
    }
  })
  return editor
}