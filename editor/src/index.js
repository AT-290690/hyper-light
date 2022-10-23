import { elements } from './common.js'
import { HyperLightEditor } from './editor.js'

HyperLightEditor(document.getElementById('comments-section'), {
  elements,
  onResize: editor =>
    editor.setSize(window.innerWidth - 5, window.innerHeight - 5),
  onPopupResize: popup =>
    popup.setSize(window.innerWidth - 5, window.innerHeight / 3),
})
