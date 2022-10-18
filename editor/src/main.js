import { CodeMirror } from '../cell.editor.bundle.js'
import { elements } from './common.js'
import { compile, interpred } from './utils.js'
import { encodeUrl } from '../../language/misc/compression.js'
import { STD, TWO_JS_HTML } from '../../language/extentions/extentions.js'
import { VOID } from '../../language/core/tokens.js'

const editor = CodeMirror(elements.commentsSection)
editor.setSize(window.innerWidth - 5, window.innerHeight - 5)

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

STD.LOGGER = (disable = 0) => {
  if (disable) return (msg, count) => {}
  const popup = createPopUp()
  popup.setSize(window.innerWidth * 1 - 20, window.innerHeight / 3)
  let count = 0
  return (msg, comment = '', space) => {
    const current = popup.getValue()
    popup.setValue(
      `${current ? current + '\n' : ''};; ${count++} ${comment}
${
  msg !== VOID
    ? typeof msg === 'string'
      ? `"${msg}"`
      : typeof msg === 'function'
      ? '-> []'
      : JSON.stringify(msg, null, space)
          .replaceAll('{', '[')
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
  appDocument.write(compile(editor.getValue(), TWO_JS_HTML))
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
  const encoded = encodeUrl(editor.getValue())
  if (encoded)
    window.open(location.href + 'preview.html?s=' + encoded, '_blank').focus()
})
window.addEventListener('resize', () =>
  editor.setSize(window.innerWidth - 5, window.innerHeight - 5)
)
const runCodeEvent = () => {
  if (elements.app.style.display === 'block') {
    elements.app.src = ''
    setTimeout(updateApp, 250)
  } else {
    elements.canvasContainer.style.display = 'none'
    interpred(editor.getValue())
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

elements.run.addEventListener('click', runCodeEvent)
