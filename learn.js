import { HyperLightEditor } from './editor/src/editor.js'

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
  const editor = HyperLightEditor(editorContainer, {
    elements,
    onResize: editor => editor.setSize(window.innerWidth - 5, HEIGHT),
    onPopupResize: popup => popup.setSize(window.innerWidth - 5, HEIGHT / 3.2),
    initialValue: problems.value,
  })
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
    this.lessons = [
      {
        value: `;; 1 Write a function last returns the last element of a list
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; .. []]];`,
        title: 'Last element of a list',
        solution: `;; solution
:= [last; -> [list; 
                ? [== [. [list; "=>"; 0]; void]; 
                                  . [list; "*"]; 
                    last [. [list; "=>"; 0]]]]];

last [list];`,
      },

      {
        value: `;; 2 Last two elements of a list
;; Find the last but one (last and penultimate) elements of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; .. []]];`,
        title: 'Last two elements of a list',
        solution: `;; solution
:= [last 2; -> [list; ? [== [. [list; "=>"; 0; "=>"; 0]; void]; 
                                                          list;
                                 last 2 [. [list; "=>"; 0]]]]];

last 2 [list];`,
      },

      {
        value: `;; 3 N'th element of a list
;; Find the N'th element of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; n; .. []]];`,
        title: `N'th element of a list`,
        solution: `;; solution
:= [nth element; -> [list; n; 
                      ? [|| [== [n; 0]; 
                             == [. [list; "=>"; 0]; void]]; 
                                             . [list; "*"]; 
              nth element [. [list; "=>"; 0]; - [n; 1]]]]];

nth element [list; 2];`,
      },

      {
        value: `;; 4 Length of a list
;; Find the number of elements of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; length; .. []]];`,
        title: `Length of a list`,
        solution: `;; solution
:= [length of list; -> [list; length; 
                              ? [== [. [list; "=>"; 0]; void];
                                                       length; 
         length of list [. [list; "=>"; 0]; + [length; 1]]]]];

length of list [list; 0];`,
      },

      {
        value: `;; 5 Reverse a list
;; Hyper List standard library has <- ["reverse"] [LIST] but we ask that you reimplement it.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [reverse; -> [list; .. []]];`,
        title: `Reverse a list`,
        solution: `;; solution
:= [reverse; -> [head; 
  ;; base case
  ? [|| [== [head; void]; 
          == [. [head; "=>"; 0]; void]]; head; .. [
        ;; reverse 
        := [reversed; reverse [. [head; "=>"; 0]]];
                 .= [head; "=>"; 0; "=>"; 0; head];
                        .= [head; "=>"; .: [void]];
                                      reversed]]]];
reverse [list]`,
      },

      {
        value: `;; 6 Palindrome
;; Find out whether a list is a palindrome.
;; HINT: a palindrome is its own reverse.
:= [list; => ["x"; => ["a"; => ["m"; => ["a"; => ["x"]]]]]];
;; := [is palindrome; -> [list; .. []]];`,
        title: `Palindrome`,
        solution: `;; solution
;; our reverse function from before
:= [reverse; -> [head; 
                ;; base case
                ? [|| [== [head; void]; 
                       == [. [head; "=>"; 0]; void]]; head; .. [
                      ;; reverse 
                      := [reversed; reverse [. [head; "=>"; 0]]];
                               .= [head; "=>"; 0; "=>"; 0; head];
                                      .= [head; "=>"; .: [void]];
                                                    reversed]]]];

;; simple function that tells us if the given nodes have same value
:= [is same; -> [a; b; == [. [a; "*"]; . [b; "*"]]]];

;; the main function 
:= [is palindrome; -> [list; .. [
      := [reversed;  
          |> [list; 
              | . ["=>"; 0]; ;; honestly no idea why 
              | ... []; ;; copy the list before reversing it
              | reverse []; ;; reverse the list
              ]];
      ~= [iterate; -> [a; b; .. [
      ? [! [is same [a; b]]; 0; 
          ? [== [. [a; "=>"; 0]; void];
                                     1; 
               iterate [. [a; "=>"; 0]; 
                   . [b; "=>"; 0]]]]]]]
                    [list; reversed]]]];

is palindrome [list]`,
      },
    ]
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
