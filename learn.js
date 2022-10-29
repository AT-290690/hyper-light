import { HyperLightEditor } from './editor/src/editor.js'
import lessons from './lessons.js'
const buildProblemEditor = (container, problems) => {
  const header = document.createElement('div')
  header.classList.add('interface-header')
  // const runButton = document.createElement('button')
  // runButton.classList.add('header-button')
  // runButton.classList.add('svgIcon')
  // runButton.setAttribute('title', 'run code')
  const appButton = document.createElement('button')
  appButton.classList.add('header-button')
  appButton.classList.add('svgIcon')
  appButton.setAttribute('title', 'open editor')

  appButton.innerHTML = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  width="18"
  height="28"
  viewBox="0 0 40 50"
  style="overflow: hidden; background: transparent; border: none"
  >
  <defs></defs>
  <g id="two-8" transform="matrix(1 0 0 1 0 0)" opacity="1">
    <g id="two-15" transform="matrix(1 0 0 1 0 0)" opacity="1">
      <path
        transform="matrix(1 0 0 1 20 25)"
        id="two-9"
        d="M -15 -20 L 15 -20 L 15 20 L -15 20 Z "
        fill="transparent"
        stroke-width="5"
        stroke-opacity="1"
        fill-opacity="1"
        visibility="visible"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="4"
      ></path>
      <path
        transform="matrix(1 0 0 1 17.5 11.5)"
        id="two-10"
        d="M -7.5 -1.5 L 7.5 -1.5 L 7.5 1.5 L -7.5 1.5 Z "
        stroke="undefined"
        stroke-width="1"
        stroke-opacity="1"
        fill-opacity="1"
        visibility="visible"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="4"
      ></path>
      <path
        transform="matrix(1 0 0 1 20 16.5)"
        id="two-11"
        d="M -10 -1.5 L 10 -1.5 L 10 1.5 L -10 1.5 Z "
        stroke="undefined"
        stroke-width="1"
        stroke-opacity="1"
        fill-opacity="1"
        visibility="visible"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="4"
      ></path>
      <path
        transform="matrix(1 0 0 1 20 21.5)"
        id="two-12"
        d="M -10 -1.5 L 10 -1.5 L 10 1.5 L -10 1.5 Z "
        stroke="undefined"
        stroke-width="1"
        stroke-opacity="1"
        fill-opacity="1"
        visibility="visible"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="4"
      ></path>
      <path
        transform="matrix(1 0 0 1 20 26.5)"
        id="two-13"
        d="M -10 -1.5 L 10 -1.5 L 10 1.5 L -10 1.5 Z "
        stroke="undefined"
        stroke-width="1"
        stroke-opacity="1"
        fill-opacity="1"
        visibility="visible"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="4"
      ></path>
      <path
        transform="matrix(1 0 0 1 15 36.5)"
        id="two-14"
        d="M -5 -1.5 L 5 -1.5 L 5 1.5 L -5 1.5 Z "
        stroke="undefined"
        stroke-width="1"
        stroke-opacity="1"
        fill-opacity="1"
        visibility="visible"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="4"
      ></path>
    </g>
  </g>
  </svg>`
  // title="run code" class="
  // runButton.innerHTML = `|>`
  // header.appendChild(runButton)
  //   <img
  //   id="logo"
  //   src="./assets/images/favicon.svg"
  //   width="50px"
  //   height="50px"
  //   // style="position: absolute; z-index: 1000; top: 0px; left: 0px"
  // />
  const logo = document.createElement('img')
  logo.src = './assets/images/favicon.svg'
  logo.classList.add('header-button')
  logo.setAttribute('title', 'run')
  logo.setAttribute('width', '50px')
  logo.setAttribute('height', '50px')
  logo.id = 'logo'
  header.appendChild(logo)
  const prev = document.createElement('button')
  prev.classList.add('header-lesson')
  prev.classList.add('svgIcon')
  prev.textContent = '<<'
  prev.setAttribute('title', 'prev')
  header.appendChild(prev)
  container.appendChild(header)
  const next = document.createElement('button')
  next.classList.add('header-lesson')
  next.classList.add('svgIcon')
  next.textContent = '>>'

  next.setAttribute('title', 'next')
  header.appendChild(next)

  const lesson = document.createElement('button')
  lesson.classList.add('header-lesson')
  lesson.classList.add('svgIcon')
  lesson.textContent = problems.title
  lesson.setAttribute('title', 'Current Problem')
  header.appendChild(lesson)
  const editorContainer = document.createElement('div')
  editorContainer.classList.add('comments-section')
  container.appendChild(editorContainer)
  const HEIGHT = window.innerHeight * 0.7
  editorContainer.style.height = `${HEIGHT}px`
  const elements = {
    openEditorButton: appButton,
    openAppButton: appButton,
    commentsSection: editorContainer,
    consoleElement: document.getElementById('console'),
    canvasContainer: document.getElementById('canvas-container'),
    popupContainer: document.getElementById('popup-container'),
    key: document.getElementById('key'),
    app: document.getElementById('app'),
    run: logo,
  }

  const settings = {
    elements,
    onResize: editor =>
      editor.setSize(document.body.getBoundingClientRect().width - 5, HEIGHT),
    onPopupResize: popup =>
      popup.setSize(
        document.body.getBoundingClientRect().width - 5,
        HEIGHT / 3.2
      ),
    initialValue: problems.value,
    showPopUpOnLoad: true,
  }
  const editor = HyperLightEditor(editorContainer, settings)

  const animate = () => {
    logo.classList.toggle('rotate')
    setTimeout(() => logo.classList.toggle('rotate'), 1000)
  }
  const changeProblem = () => {
    lesson.textContent = problems.title
    editor.setValue(problems.value)
    problems.clearLocks()
    animate()
  }
  logo.addEventListener('click', animate)
  next.addEventListener('click', () => {
    problems.next()
    changeProblem()
  })
  prev.addEventListener('click', () => {
    problems.prev()
    changeProblem()
  })
  lesson.addEventListener('click', () =>
    editor.setValue(`${editor.getValue()}\n\n${problems.solution}`)
  )
  lesson.addEventListener(
    'mouseover',
    e => (e.target.textContent = 'Reveal The Solution!')
  )
  lesson.addEventListener(
    'mouseleave',
    e => (e.target.textContent = problems.title)
  )
  return editor
}
class Lesson {
  constructor() {
    this.locks = []
    this.index = 0
    this.lessons = lessons
  }
  get value() {
    return this.lessons[this.index].value
  }
  get title() {
    return this.lessons[this.index].title
  }
  get solution() {
    if (this.locks[this.index]) return ''
    const out = this.lessons[this.index].solution
    this.locks[this.index] = true
    return out
  }
  clearLocks() {
    this.locks.length = 0
  }
  next() {
    this.index = Math.min(this.lessons.length - 1, this.index + 1)
  }
  prev() {
    this.index = Math.max(0, this.index - 1)
  }
}
buildProblemEditor(document.getElementById('problems'), new Lesson())
