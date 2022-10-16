import { CodeMirror } from '../cell.editor.bundle.js'
import { elements } from './common.js'
import { compile, interpred } from './utils.js'
import { encodeUrl } from './compression.js'
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
      : JSON.stringify(msg, null, space)
          .replaceAll('{', '[')
          .replaceAll('}', ']')
          .replaceAll(',', '; ')
          .replaceAll('":', '"; ')
    : VOID
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

document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    e.stopPropagation()
    elements.consoleElement.textContent = ''
    elements.popupContainer.innerHTML = ''
    if (elements.app.style.display === 'block') {
      elements.app.src = ''
      setTimeout(updateApp, 250)
    } else {
      elements.canvasContainer.style.display = 'none'
      interpred(editor.getValue())
    }
  }
})

editor.setValue(`<- ["SKETCH"; "ARRAY"; "OBJECT"; "MATH"] [LIB]; 
<- ["push"; "foreach"] [ARRAY]; 
<- ["forof"] [OBJECT]; 
<- ["randomint"] [MATH; "roll"];

;; STATE
:= [N; 50]; 
:= [factor; 0.25]; 
:= [r; * [N; factor]]; 
:= [h; * [r; factor; -1]]; 
:= [COLORS; .: ["black"; "crimson"]];
:= [cols; N]; 
:= [rows; N]; 
:= [cells; .: []]; 
:= [get cell; -> [x; y; . [cells; + [x; * [rows; y]]]]]; 

:= [make grid; -> [cells; .. [
:= [cells container; make group []]; 

~= [loop; -> [count; bounds; .. [
  ? [! [% [count; cols]]; = [h; + [h; r]]]; 

  := [is alive; roll random int [0; 1]]; 
  := [next is alive; roll random int [0; 1]]; 
  := [rect; |> [make rectangle [% [* [count; r]; * [r; cols]]; h; r; r]; 
      | set fill [. [COLORS; is alive]];
      | no stroke []]];
  := [cell; :: ["state"; :: ["alive"; is alive; "next"; next is alive]; "render"; rect]]; 
  insert into group [cells container; rect]; 
  push [cells; cell]; 
  ? [> [bounds; count]; loop [= [count; + [count; 1]]; bounds]]]]];
loop [0; - [* [rows; cols]; 1]]; cells container]]];

:= [iterate cells; -> [cells; callback; .. [
:= [y; -1]; 
for each [cells; -> [cell; i; cells; .. [
  = [y; ? [% [i; rows]; 
  y; = [y; + [y; 1]]]]; 
  := [x; % [i; cols]]; 
  := [cell; get cell [x; y]]; 
  callback [cell; x; y]]]]]]]; 

:= [directions; .: [
  :: ["x"; 0; "y"; 1]; 
  :: ["x"; 1; "y"; 0]; 
  :: ["x"; -1; "y"; 0]; 
  :: ["x"; 0; "y"; -1]; 
  :: ["x"; 1; "y"; -1]; 
  :: ["x"; -1; "y"; -1]; 
  :: ["x"; 1; "y"; 1]; 
  :: ["x"; -1; "y"; 1]]]; 

:= [adjacent; -> [x; y; .. [
:= [sum; 0]; 

for of [directions; -> [dir; .. [
  <- ["x"; "y"] [dir; "dir"]; 
  := [cell; get cell [+ [x; dirx]; 
  + [y; diry]]]; 
  = [sum; + [sum; ? [cell; . [cell; "state"; "alive"]; 0]]]]]]; sum]]];

:= [update state; -> [iterate cells [cells; -> [cell; x; y; .. [
  := [is alive; . [cell; "state"; "alive"]]; 
  := [neighbors; adjacent [x; y]]; 
  ? [&& [isalive; < [neighbors; 2]]; 
    .= [cell; "state"; "next"; 0]; 
      ? [&& [is alive; > [neighbors; 3]]; 
        .= [cell; "state"; "next"; 0]; 
           ? [&& [! [is alive]; 
             == [neighbors; 3]]; 
  .= [cell; "state"; "next"; 1]]]]]]]]]; 

:= [trottle; -> [delta; value; callback; ? [! [% [delta; value]]; callback []]]];

:= [render; -> [iterate cells [cells; -> [cell; x; y; .. [
  := [is alive; . [cell; "state"; "alive"]]; 
  set fill [. [cell; "render"]; . [COLORS; is alive]]; 
  .= [cell; "state"; "alive"; . [cell; "state"; "next"]]]]]]]; 

:= [lifespan; 1000]; 
make scene [1300; 500; -> [.. [
  := [cells container; 
  |> [cells; 
    | makegrid []; 
    | set position [15; 15]]]; 
  draw [lifespan; -> [delta; fps; trottle [delta; 8; -> [.. [
    update state []; 
    render []]]]]]; 
  play []]]]; `)
