import { VOID } from '../core/tokens.js'

export const TWO_JS_HTML = `<div id="canvas-container"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/two.js/0.8.10/two.min.js" integrity="sha512-D9pUm3+gWPkv/Wl6vd45vRLjdkdEKGje7BxOxYG0N6m4UlEUB7RSljBwpmJNAOuf6txLLtlaRchoKfzngr/bQg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script> const canvasContainer = document.getElementById("canvas-container") </script>`

export const protolessModule = methods => {
  const env = Object.create(null)
  for (const method in methods) env[method] = methods[method]
  return env
}

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

LOGGER: (disable = 0, createPopUp, popUp) => {
  if (disable || !createPopUp || popUp) return (msg, count) => {}
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

const LIB = {
  NAME: 'LIB',
  DATE: {
    NAME: 'DATE',
    formattolocal: (date, format) => date.toLocaleDateString(format),
    makenewdate: () => new Date(),
    makedate: date => new Date(date),
    gethours: date => date.getHours(),
    getminutes: date => date.getMinutes(),
    getseconds: date => date.getSeconds(),
    gettime: date => date.getTime(),
  },
  COLOR: {
    NAME: 'COLOR',
    makergbcolor: (r, g, b) => `rgb(${r}, ${g}, ${b})`,
    makergbalphacolor: (r, g, b, a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`,
    randomcolor: () => `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    randomlightcolor: () =>
      '#' +
      (
        '00000' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)
      ).slice(-6),
    rgbtohex: color => {
      const [r, g, b] = color.split('(')[1].split(')')[0].split(',').map(Number)
      function componentToHex(c) {
        var hex = c.toString(16)
        return hex.length == 1 ? '0' + hex : hex
      }
      return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
    },
    inverthexcolor: hex =>
      '#' +
      (Number(`0x1${hex.split('#')[1]}`) ^ 0xffffff)
        .toString(16)
        .substring(1)
        .toUpperCase(),
  },
  SKETCH: {
    NAME: 'SKETCH',
    COMMANDS: {
      NAME: 'COMMANDS',
      MOVE: () => Two.Commands.move,
      CURVE: () => Two.Commands.curve,
      LINE: () => Two.Commands.line,
    },
    ANCHOR: {
      NAME: 'ANCHOR',
      anchor: (p1, p2, p3, p4, p5, p6, p7) =>
        new Two.Anchor(p1, p2, p3, p4, p5, p6, p7),
    },
    PATH: {
      NAME: 'PATH',
      pathfrom: points => {
        const path = LIB.SKETCH.engine.makePath(...points)
        path.closed = false
        return path
      },
      makepath: (...points) => {
        const path = LIB.SKETCH.engine.makePath(...points)
        path.closed = false
        return path
      },
      path: (anchors, a, b, c) => new Two.Path(anchors, a, b, c),
    },
    VECTOR: {
      NAME: 'VECTOR',
      makevector: (...args) => new Two.Vector(...args),
      ZERO: () => Two.Vector.zero,
      LEFT: () => Two.Vector.left,
      RIGHT: () => Two.Vector.right,
      UP: () => Two.Vector.up,
      DOWN: () => Two.Vector.down,
      add: (a, b) => Two.Vector.add(a, b),
      subtract: (a, b) => Two.Vector.subtract(a, b),
      multiply: (a, b) => Two.Vector.add(a, b),
      divide: (a, b) => a.divide(b),
      dot: (a, b) => a.dot(b),
      normalize: vec => vec.normalize(),
      ratiobetween: (a, b) => Two.Vector.ratioBetween(a, b),
      anglebetween: (a, b) => Two.Vector.angleBetween(a, b),
      distancebetween: (a, b) => Two.Vector.distanceBetween(a, b),
      distancebetweensquared: (a, b) => Two.Vector.distanceBetweenSquared(a, b),
      distanceto: (a, b, e) => a.distanceTo(b, e),
      distancetosquared: (a, b, e) => a.distanceToSquared(b, e),
      getx: vec => vec.x,
      gety: vec => vec.y,
      copy: (vec, d) => vec.copy(d),
      clear: vec => vec.clear(),
      clone: vec => vec.clone(),
      lerp: (vec, d, t) => vec.lerp(d, t),
      addself: (vec, a) => vec.addSelf(a),
      subtractself: (vec, a) => vec.subtractSelf(a),
      multiplyself: (vec, a) => vec.multiplySelf(a),
      multiplyscalar: (vec, scalar) => vec.multiplyScalar(scalar),
      dividescalar: (vec, scalar) => vec.divideScalar(scalar),
      setlength: (vec, len) => vec.setLength(len),
      length: vec => vec.length(),
      rotate: (vec, angle) => vec.rotate(angle),
    },
    background: (color = 'var(--background-primary)') =>
      (LIB.SKETCH.CANVAS_CONTAINER.firstChild.style.background = color),
    requestanimationframe: fn => (animation = requestAnimationFrame(fn)),
    destroycomposition: () => {
      LIB.SKETCH.CANVAS_CONTAINER.style.background = 'var(--background-primary)'
      LIB.SKETCH.CANVAS_CONTAINER.innerHTML = ''
      LIB.SKETCH.engine?.removeEventListener('update')
    },
    makescene: (width = 100, height = 100, callback) => {
      LIB.SKETCH.engine?.removeEventListener('update')
      LIB.SKETCH.CANVAS_CONTAINER = document.getElementById('canvas-container')
      LIB.SKETCH.engine = new Two({
        width,
        height,
      }).appendTo(LIB.SKETCH.CANVAS_CONTAINER)
      callback()
      return 'Scene created!'
    },
    insertintogroup: (group, ...items) => {
      group.add(...items)
      return group
    },
    insertintogroupbypartitions: (group, ...partitions) => {
      partitions.forEach(items => group.add(...items))
      return group
    },
    removefromgroup: item => {
      item.parent.remove(item)
      LIB.SKETCH.engine.add(item)
      return item
    },
    removefromscene: item => {
      item.remove()
      return VOID
    },
    groupadditions: group => group.additions,
    groupchildren: group => group.children,
    width: (ratio = 1) => LIB.SKETCH.engine.width * ratio,
    height: (ratio = 1) => LIB.SKETCH.engine.height * ratio,
    add: (...elements) => LIB.SKETCH.engine.add(...elements),
    clear: () => LIB.SKETCH.engine.clear(),
    ignore: (...args) => LIB.SKETCH.engine.ignore(...args),
    interpret: index =>
      LIB.SKETCH.engine.interpret(document.getElementById(index)),
    listen: (...args) => LIB.SKETCH.engine.listen(...args),
    load: (...args) => LIB.SKETCH.engine.load(...args),
    makearcsegment: (...args) => LIB.SKETCH.engine.makeArcSegment(...args),
    makearrow: (...args) => LIB.SKETCH.engine.makeArrow(...args),
    makecircle: (x, y, r) => LIB.SKETCH.engine.makeCircle(x, y, r),
    makecurve: (...points) => LIB.SKETCH.engine.makeCurve(...points),
    makeellipse: (...args) => LIB.SKETCH.engine.makeEllipse(...args),
    makegroup: (...args) => LIB.SKETCH.engine.makeGroup(...args),
    makeimagesequence: (...args) =>
      LIB.SKETCH.engine.makeImageSequence(...args),
    makeline: (x1, y1, x2, y2, color = 'white') => {
      const line = LIB.SKETCH.engine.makeLine(x1, y1, x2, y2)
      line.stroke = color
      return line
    },
    makelineargradient: (...args) =>
      LIB.SKETCH.engine.makeLinearGradient(...args),
    makepath: (...args) => LIB.SKETCH.engine.makePath(...args),
    makepoints: (...args) => LIB.SKETCH.engine.makePoints(...args),
    makepolygon: (...args) => LIB.SKETCH.engine.makePolygon(...args),
    makeradialgradient: (...args) =>
      LIB.SKETCH.engine.makeRadialGradient(...args),
    makerectangle: (x, y, w, h) => LIB.SKETCH.engine.makeRectangle(x, y, w, h),
    makeroundedrectangle: (...args) =>
      LIB.SKETCH.engine.makeRoundedRectangle(...args),
    makesprite: (...args) => LIB.SKETCH.engine.makeSprite(...args),
    makestar: (...args) => LIB.SKETCH.engine.makeStar(...args),
    maketext: (...args) => LIB.SKETCH.engine.makeText(...args),
    maketexture: (...args) => LIB.SKETCH.engine.makeTexture(...args),
    on: (...args) => LIB.SKETCH.engine.on(...args),
    off: (...args) => LIB.SKETCH.engine.off(...args),
    pause: (...args) => {
      LIB.SKETCH.engine.pause(...args)
      return 'Paused!'
    },
    play: (...args) => {
      LIB.SKETCH.engine.play(...args)
      return 'Playing!'
    },
    release: (...args) => LIB.SKETCH.engine.release(...args),
    remove: (...args) => LIB.SKETCH.engine.remove(...args),
    setplaying: (...args) => LIB.SKETCH.engine.setPlaying(...args),
    trigger: (...args) => LIB.SKETCH.engine.trigger(...args),
    update: (...args) => {
      LIB.SKETCH.engine.update(...args)
      return 'Updated!'
    },
    nofill: entity => {
      entity.noFill()
      return entity
    },
    nostroke: entity => {
      entity.noStroke()
      return entity
    },
    draw: (lifespan, callback) => {
      if (callback && typeof callback === 'function') {
        LIB.SKETCH.engine.bind('update', callback)
        setTimeout(() => {
          LIB.SKETCH.engine.unbind('update', callback)
          LIB.SKETCH.engine.removeEventListener('update')
        }, 1000 * lifespan)
      }
    },

    setscreensize: (w, h, showBorder = true) => {
      const svg = LIB.SKETCH.CANVAS_CONTAINER.firstChild
      svg.setAttribute('width', w)
      svg.setAttribute('height', h)
      if (showBorder) svg.style.border = '1px solid lime'
    },
    setoffsetstart: entity => {
      entity.position.x = entity.position.x + entity.width * 0.5
      entity.position.y = entity.position.y + entity.height * 0.5
      return entity
    },
    setfill: (entity, fill) => {
      entity.fill = fill
      return entity
    },
    setstroke: (entity, stroke) => {
      entity.stroke = stroke
      return entity
    },
    setdashes: (entity, dashes) => {
      entity.dashes = dashes
      return entity
    },
    setlinewidth: (entity, linewidth) => {
      entity.linewidth = linewidth
      return entity
    },
    offsetby: (entity, x, y) => {
      entity.additions
        ? entity.additions.forEach(item => {
            item.position.set(item.position.x - x, item.position.y - y)
          })
        : entity.origin.set(x, y)

      entity.position.set(x, y)
      return entity
    },
    setposition: (entity, x, y) => {
      entity.position.set(x, y)
      return entity
    },
    setpositionx: (entity, x) => {
      entity.position.x = x
      return entity
    },
    setpositiony: (entity, y) => {
      entity.position.y = y
      return entity
    },
    setscale: (entity, s) => {
      entity.scale = s
      return entity
    },
    setopacity: (entity, opacity) => {
      entity.opacity = opacity
      return entity
    },
    setrotation: (entity, a) => {
      entity.rotation = a
      return entity
    },
    setwidth: (entity, w) => {
      entity.width = w
      return entity
    },
    setheight: (entity, h) => {
      entity.height = h
      return entity
    },
    setorigin: (entity, x, y) => {
      entity.additions
        ? entity.additions.forEach(item => {
            item.position.set(item.position.x - x, item.position.y - y)
          })
        : entity.origin.set(x, y)
      return entity
    },
    closepath: path => {
      path.closed = true
      return path
    },
    make: (prop, ...args) => new Two[prop](...args),
    getwidth: () => document.body.getBoundingClientRect().width,
    getheight: () => document.body.getBoundingClientRect().height,
    getfromgroup: (group, index) => group.additions[index],
    getorigin: entity => entity.origin,
    getopacity: entity => entity.opacity,
    getdashes: entity => entity.dashes,
    getposition: entity => entity.position,
    gettranslation: entity => entity.translation,
    getbounds: entity => entity.getBoundingClientRect(),
  },
  OBJECT: {
    NAME: 'OBJECT',
    forin: (object, callback) => {
      for (const key in object) callback(key, object)
      return object
    },
    forof: (object, callback) => {
      for (const key in object) callback(object[key])
      return object
    },
    jsonstring: object => JSON.stringify(object),
    jsonparse: string => JSON.parse(string),
    clone: obj => structuredClone(obj),
    has: (obj, ...props) => +props.every(x => x in obj),
    keys: obj => Object.keys(obj),
    values: obj => Object.values(obj),
    entries: obj => Object.entries(obj),
    fromentries: entries => Object.fromEntries(entries),
    freeze: obj => {
      void Object.freeze(obj)
      return obj
    },
    size: obj => Object.keys(obj).length,
  },
  MATH: {
    NAME: 'MATH',
    lerp: (start, end, amt) => (1 - amt) * start + amt * end,
    abs: num => Math.abs(num),
    mod: (left, right) => ((left % right) + right) % right,
    clamp: (num, min, max) => Math.min(Math.max(num, min), max),
    sqrt: num => Math.sqrt(num),
    inc: (a, i = 1) => (a += i),
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mult: (a, b) => a * b,
    pow: (a, b) => a ** b,
    pow2: a => a ** 2,
    divide: (a, b) => a / b,
    sign: n => Math.sign(n),
    trunc: n => Math.trunc(n),
    exp: n => Math.exp(n),
    floor: n => Math.floor(n),
    round: n => Math.round(n),
    random: () => Math.random(),
    dice: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    rolldice: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    max: (...args) => Math.max(...args),
    min: (...args) => Math.min(...args),
    sin: n => Math.sin(n),
    cos: n => Math.cos(n),
    tan: n => Math.tan(n),
    atan: n => Math.atan(n),
    atan2: (y, x) => Math.atan2(y, x),
    log10: x => Math.log10(x),
    log2: x => Math.log2(x),
    log: x => Math.log(x),
    sum: arr => arr.reduce((acc, item) => (acc += item), 0),
    MININT: Number.MIN_SAFE_INTEGER,
    MAXINT: Number.MAX_SAFE_INTEGER,
    infinity: Number.POSITIVE_INFINITY,
    negative: n => -n,
    PI: Math.PI,
    parseint: (number, base) => parseInt(number.toString(), base),
    number: string => Number(string),
  },
  STRING: {
    NAME: 'STRING',
    interpolate: (...args) => {
      return args.reduce((acc, item) => {
        return (acc += item.toString())
      }, '')
    },
    includes: (string, target) => string.includes(target),
    string: thing => thing.toString(),
    uppercase: string => string.toUpperCase(),
    lowercase: string => string.toLowerCase(),
    trim: string => string.trim(),
    trimstart: string => string.trimStart(),
    trimend: string => string.trimEnd(),
    substring: (string, start, end) =>
      string.substring(start, end ?? end.length),
    replace: (string, match, replace) => string.replace(match, replace),
    sp: ' ',
  },
  CONVERT: {
    NAME: 'CONVERT',
    array: thing => [...thing],
    boolean: thing => Boolean(thing),
    string: thing => thing.toString(),
    integer: number => parseInt(number.toString()),
    float: (number, base = 1) => +Number(number).toFixed(base),
    number: thing => Number(thing),
  },
  CONSOLE: {
    consolelog: thing => console.log(thing),
    NAME: 'CONSOLE',
  },
  LOGIC: {
    NAME: 'LOGIC',
    istrue: bol => +(!!bol === true),
    isfalse: bol => +(!!bol === false),
    isequal: (a, b) => {
      const typeA = typeof a,
        typeB = typeof b
      if (typeA !== typeB) return 0
      if (typeA === 'number' || typeA === 'string' || typeA === 'boolean') {
        return +(a === b)
      }
      if (typeA === 'object') {
        const isArrayA = Array.isArray(a),
          isArrayB = Array.isArray(b)
        if (isArrayA !== isArrayB) return 0
        if (isArrayA && isArrayB) {
          if (a.length !== b.length) return 0
          return +a.every((item, index) => LIB.LOGIC.isequal(item, b[index]))
        } else {
          if (a === undefined || a === null || b === undefined || b === null)
            return +(a === b)
          if (Object.keys(a).length !== Object.keys(b).length) return 0
          for (const key in a) {
            if (!LIB.LOGIC.isequal(a[key], b[key])) {
              return 0
            }
          }
          return 1
        }
      }
    },
    issimilar: (a, b) => {
      const typeA = typeof a,
        typeB = typeof b
      if (typeA !== typeB) return 0
      if (typeA === 'number' || typeA === 'string' || typeA === 'boolean') {
        return +(a === b)
      }
      if (typeA === 'object') {
        const isArrayA = Array.isArray(a),
          isArrayB = Array.isArray(b)
        if (isArrayA !== isArrayB) return 0
        if (isArrayA && isArrayB) {
          return a.length < b.length
            ? +a.every((item, index) => LIB.LOGIC.issimilar(item, b[index]))
            : +b.every((item, index) => LIB.LOGIC.issimilar(item, a[index]))
        } else {
          if (a === undefined || a === null || b === undefined || b === null)
            return +(a === b)
          const less = Object.keys(a) > Object.keys(b) ? b : a
          for (const key in less) {
            if (!LIB.LOGIC.issimilar(a[key], b[key])) {
              return 0
            }
          }
          return 1
        }
      }
    },
    isnotvoid: item => (item === VOID ? 0 : 1),
    isvoid: item => (item === VOID ? 1 : 0),
    makeboolean: item => Boolean(item),
    and: (entity, other) => entity && other,
    or: (entity, other) => entity || other,
    isempty: item => (Object.keys(item).length === 0 ? 1 : 0),
    TRUE: 1,
    FALSE: 0,
    iseven: arg => (arg % 2 === 0 ? 1 : 0),
    isodd: arg => (arg % 2 !== 0 ? 1 : 0),
    invert: val => +!val,
    ishaving: (obj, ...props) => +props.every(x => x in obj),
    areequal: (item, ...args) =>
      +args.every(current => LIB.LOGIC.isequal(item, current)),
  },
  LOOP: {
    NAME: 'LOOP',
    generator: (entity = [], index = 0) => {
      return function* () {
        while (true) {
          yield entity[index++]
        }
      }
    },
    counter: (index = 0) => {
      return function* () {
        while (true) {
          yield index++
        }
      }
    },
    next: entity => {
      return entity.next().value
    },
    iterate: (iterable, callback) => {
      for (const i in iterable) {
        callback(i, iterable)
      }
      return iterable
    },
    inside: (iterable, callback) => {
      for (const i in iterable) {
        callback(i)
      }
      return iterable
    },
    forofevery: (iterable, callback) => {
      for (const x of iterable) {
        callback(x)
      }
      return iterable
    },
    routine: (entity, times, callback) => {
      let out = VOID
      for (let i = 0; i < times; ++i) out = callback(entity, i)
      return out
    },
    loop: (start, end, callback) => {
      for (let i = start; i < end; ++i) callback(i)
    },
    whiletrue: (condition, callback) => {
      let out = VOID
      while (condition()) out = callback()
      return out
    },
    repeat: (times, callback) => {
      let out = VOID
      for (let i = 0; i < times; ++i) out = callback(i)
      return out
    },
    tailcalloptimisedrecursion:
      func =>
      (...args) => {
        let result = func(...args)
        while (typeof result === 'function') result = result()
        return result
      },
  },
  ARRAY: {
    NAME: 'ARRAY',
    ['map1']: (entity, callback) => {
      return entity.map(x => callback(x))
    },
    ['filter1']: (entity, callback) => {
      return entity.filter(x => callback(x))
    },
    ['fold1']: (entity, callback) => {
      return entity.reduce(acc => callback(acc), [])
    },
    ['fold2']: (entity, callback) => {
      return entity.reduce((acc, item) => callback(acc, item), [])
    },
    ['fold3']: (entity, callback) => {
      return entity.reduce((acc, item, index) => callback(acc, item, index), [])
    },
    ['reduce1']: (entity, callback, acc) => {
      return entity.reduce(acc => callback(acc), acc)
    },
    ['reduce2']: (entity, callback, acc) => {
      return entity.reduce((acc, x) => callback(acc, x), acc)
    },
    ['find1']: (entity, callback) => {
      return entity.find(x => callback(x))
    },
    ['some1']: (entity, callback) => {
      return entity.some(x => callback(x))
    },
    ['every1']: (entity, callback) => {
      return entity.every(x => callback(x))
    },
    ['map3']: (entity, callback) => {
      return entity.map((x, i, a) => callback(x, i, a))
    },
    ['filter3']: (entity, callback) => {
      return entity.filter((x, i, a) => callback(x, i, a))
    },
    ['reduce3']: (entity, callback, acc) => {
      return entity.reduce((acc, x, i, a) => callback(acc, x, i, a), acc)
    },
    ['find3']: (entity, callback) => {
      return entity.find((x, i, a) => callback(x, i, a))
    },
    ['some3']: (entity, callback) => {
      return entity.some((x, i, a) => callback(x, i, a))
    },
    ['every3']: (entity, callback) => {
      return entity.every((x, i, a) => callback(x, i, a))
    },
    ['foreach1']: (entity, callback) => {
      entity.forEach(x => callback(x))
      return entity
    },
    ['foreach2']: (entity, callback) => {
      entity.forEach((x, i) => callback(x, i))
      return entity
    },
    compact: arr => {
      return arr.filter(Boolean)
    },
    makearray: (...items) => {
      return items
    },
    makematrix: (...dimensions) => {
      if (dimensions.length > 0) {
        const dim = dimensions[0]
        const rest = dimensions.slice(1)
        const arr = []
        for (let i = 0; i < dim; ++i) arr[i] = LIB.ARRAY.makematrix(...rest)
        return arr
      } else return VOID
    },
    unique: entity => {
      const set = new Set()
      return entity.reduce((acc, item) => {
        if (!set.has(item)) {
          set.add(item)
          acc.push(item)
        }
        return acc
      }, [])
    },
    indexediteration: (entity, fn) => entity.forEach((x, i, arr) => fn(i)),
    forof: (entity, fn) => entity.forEach((x, i, arr) => fn(x)),
    each: (entity, fn) => entity.forEach((x, i, arr) => fn(x, i)),
    from: items => Array.from(items),
    transform: (entity, callback) => {
      for (let i = 0; i < entity.length; ++i)
        entity[i] = callback(entity[i], i, entity)
      return entity
    },
    tail: entity => {
      entity.shift()
      return entity
    },
    head: entity => {
      entity.pop()
      return entity
    },
    map: (entity, callback) => entity.map(callback),
    filter: (entity, callback) => entity.filter(callback),
    reduce: (entity, callback, acc) => entity.reduce(callback, acc),
    foreach: (entity, callback) => entity.forEach(callback),
    reverse: entity => entity.reverse(),
    insertatend: (entity, ...args) => {
      entity.push(...args)
      return entity
    },
    removefromend: entity => {
      entity.pop()
      return entity
    },
    put: (entity, item) => {
      entity.push(item)
      return item
    },
    push: (entity, ...args) => entity.push(...args),
    pop: entity => entity.pop(),
    prepend: (entity, item) => {
      entity.unshift(item)
      return entity
    },
    append: (entity, item) => {
      entity.push(item)
      return entity
    },
    tail: entity => {
      entity.pop()
      return entity
    },
    head: entity => {
      entity.shift()
      return entity
    },
    includes: (entity, arg) => +entity.includes(arg),
    isarray: entity => +entity.isArray(),
    unshift: (entity, ...args) => entity.unshift(...args),
    shift: entity => entity.shift(),
    fill: (entity, filling) => entity.fill(filling),
    find: (entity, callback) => entity.find(callback),
    findindex: (entity, callback) => entity.findIndex(callback),
    indexof: (entity, item) => entity.indexOf(item),
    some: (entity, callback) => +entity.some(callback),
    every: (entity, callback) => +entity.every(callback),
    split: (str, separator) => str.split(separator),
    join: (entity, separator) => entity.join(separator),
    flat: (entity, level) => entity.flat(level),
    flatMap: (entity, callback) => entity.flatMap(callback),
    sort: (entity, callback) => entity.sort(callback),
    slice: (entity, start, end) => entity.slice(start, end),
    splice: (entity, ...args) => entity.splice(...args),
    zeroes: size => new Array(size).fill(0),
    ones: size => new Array(size).fill(1),
    range: (start, end, step = 1) => {
      const arr = []
      if (start > end) for (let i = start; i >= end; i -= 1) arr.push(i * step)
      else for (let i = start; i <= end; i += 1) arr.push(i * step)
      return arr
    },
    at: (entity, index) => entity.at(index),
    first: entity => entity[0],
    last: entity => entity[entity.length - 1],
  },
  BINAR: {
    NAME: 'BINAR',
    offsetleft: entity => (entity.left.length - 1) * -1,
    offsetright: entity => entity.right.length,
    negativeZero: Symbol('-0'),
    makebinar: () => ({ left: [LIB.BINAR.negativeZero], right: [] }),
    length: entity => entity.left.length + entity.right.length - 1,
    clear: entity => {
      entity.left = [LIB.BINAR.negativeZero]
      entity.right = []
      return entity
    },
    zeroes: size => LIB.BINAR.from(new Array(size).fill(0)),
    ones: size => LIB.BINAR.from(new Array(size).fill(1)),
    flatten: (collection, levels, flat) =>
      LIB.BINAR.to(
        collection,
        (acc, current) => {
          if (LIB.BINAR.isbinar(current))
            acc.push(...LIB.BINAR.toarray(flat(current, levels)))
          else acc.push(current)
          return acc
        },
        []
      ),
    get: (entity, offset) => {
      const offsetIndex = offset + LIB.BINAR.offsetleft(entity)
      const index = offsetIndex < 0 ? offsetIndex * -1 : offsetIndex
      return offsetIndex >= 0 ? entity.right[index] : entity.left[index]
    },
    at: (entity, index) => {
      if (index < 0)
        return LIB.BINAR.get(entity, LIB.BINAR.length(entity) + index)
      else return LIB.BINAR.get(entity, index)
    },
    set: (entity, index, value) => {
      const offset = index + LIB.BINAR.offsetleft(entity)
      if (offset >= 0) entity.right[offset] = value
      else entity.left[offset * -1] = value
    },
    first: entity => LIB.BINAR.get(entity, 0),
    last: entity => LIB.BINAR.get(entity, LIB.BINAR.length(entity) - 1),
    toarray: entity => {
      const len = LIB.BINAR.length(entity)
      const out = []
      for (let i = 0; i < len; ++i) out.push(LIB.BINAR.get(entity, i))
      return out
    },
    toarraydeep: entity => {
      return LIB.BINAR.isbinar(entity)
        ? LIB.BINAR.toarray(
            LIB.BINAR.map(entity, item =>
              LIB.BINAR.isbinar(item)
                ? LIB.BINAR.some(item, LIB.BINAR.isbinar)
                  ? LIB.BINAR.toarraydeep(item)
                  : LIB.BINAR.toarray(item)
                : item
            )
          )
        : entity
    },
    copy: entity => {
      const lem = LIB.BINAR.length(entity)
      const out = LIB.BINAR.makebinar()
      const half = (lem / 2) | 0.5
      for (let i = half - 1; i >= 0; i--)
        LIB.BINAR.addtoleft(out, LIB.BINAR.get(entity, i))
      for (let i = half; i < lem; ++i)
        LIB.BINAR.addtoright(out, LIB.BINAR.get(entity, i))
      return out
    },
    isbinar: entity =>
      typeof entity === 'object' &&
      'left' in entity &&
      entity.left[0] === LIB.BINAR.negativeZero,
    isbalanced: entity =>
      LIB.BINAR.offsetright(entity) + LIB.BINAR.offsetleft(entity) === 0,
    balance: entity => {
      if (LIB.BINAR.isbalanced(entity)) return entity
      const initial = LIB.BINAR.toarray(entity)
      LIB.BINAR.clear(entity)
      const half = (initial.length / 2) | 0.5
      for (let i = half - 1; i >= 0; i--)
        LIB.BINAR.addtoleft(entity, initial[i])
      for (let i = half; i < initial.length; ++i)
        LIB.BINAR.addtoright(entity, initial[i])
      return entity
    },
    addtoleft: (entity, item) => entity.left.push(item),
    addtoright: (entity, item) => entity.right.push(item),
    removefromleft: entity => {
      const len = LIB.BINAR.length(entity)
      if (len) {
        if (len === 1) LIB.BINAR.clear(entity)
        else if (entity.left.length > 0) entity.left.length--
      }
    },
    removefromright: entity => {
      const len = LIB.BINAR.length(entity)
      if (len) {
        if (len === 1) LIB.BINAR.clear(entity)
        else if (entity.right.length > 0) entity.right.length--
      }
    },
    fill: (entity, ...initial) => {
      const half = (initial.length / 2) | 0.5
      for (let i = half - 1; i >= 0; i--)
        LIB.BINAR.addtoleft(entity, initial[i])
      for (let i = half; i < initial.length; ++i)
        LIB.BINAR.addtoright(entity, initial[i])
      return entity
    },
    from: initial => LIB.BINAR.fill(LIB.BINAR.makebinar(), ...initial),
    makebinarwith: (...intilal) =>
      LIB.BINAR.fill(LIB.BINAR.makebinar(), ...intilal),
    map: (entity, callback) => {
      const result = LIB.BINAR.makebinar()
      const len = LIB.BINAR.length(entity)
      const half = (len / 2) | 0.5
      for (let i = half - 1; i >= 0; i--)
        LIB.BINAR.addtoleft(
          result,
          callback(LIB.BINAR.get(entity, i), i, entity)
        )
      for (let i = half; i < len; ++i)
        LIB.BINAR.addtoright(
          result,
          callback(LIB.BINAR.get(entity, i), i, entity)
        )
      return result
    },
    filter: (entity, callback) => {
      const out = []
      const len = LIB.BINAR.length(entity)
      for (let i = 0; i < len; ++i) {
        const current = LIB.BINAR.get(entity, i)
        const predicat = callback(current, i, entity)
        if (predicat) out.push(current)
      }
      return LIB.BINAR.fill(LIB.BINAR.makebinar(), ...out)
    },
    some: (entity, callback) => {
      const len = LIB.BINAR.length(entity)
      for (let i = 0; i < len; i += 1)
        if (callback(LIB.BINAR.get(entity, i), i, entity)) return true
      return false
    },
    every: (entity, callback) => {
      const len = LIB.BINAR.length(entity)
      for (let i = 0; i < len; i += 1)
        if (
          i >= LIB.BINAR.length(entity) ||
          !callback(LIB.BINAR.get(entity, i), i, entity)
        )
          return false
      return true
    },
    findfirst: (entity, callback) => {
      const len = LIB.BINAR.length(entity)
      for (let i = 0; i < len; i += 1) {
        const current = LIB.BINAR.get(entity, i)
        if (callback(current, i, entity)) return current
      }
    },
    findlast: (entity, callback) => {
      const len = LIB.BINAR.length(entity)
      for (let i = len - 1; i >= 0; i -= 1) {
        const current = LIB.BINAR.get(entity, i)
        if (callback(current, i, entity)) return current
      }
    },
    scan: (entity, callback, dir = 1) => {
      const len = LIB.BINAR.length(entity)
      if (dir === -1)
        for (let i = len; i >= 0; i -= 1)
          callback(LIB.BINAR.get(entity, i), i, entity)
      else
        for (let i = 0; i < len; i += 1)
          callback(LIB.BINAR.get(entity, i), i, entity)
      return entity
    },
    each: (entity, callback) => {
      const len = LIB.BINAR.length(entity)
      for (let i = 0; i < len; i += 1) callback(LIB.BINAR.get(entity, i))
      return entity
    },
    reverse: entity => {
      const len = LIB.BINAR.length(entity)
      if (len <= 2) {
        if (len === 1) return entity
        const temp = LIB.BINAR.get(entity, 0)
        LIB.BINAR.set(entity, 0, LIB.BINAR.get(entity, 1))
        LIB.BINAR.set(entity, 1, temp)
        return entity
      }
      const left = entity.left
      const right = entity.right
      right.unshift(left.shift())
      entity.left = right
      entity.right = left
      return entity
    },
    isempty: entity => (entity.left.length + entity.right.length === 1 ? 1 : 0),
    isinbounds: (entity, index) => index >= 0 && index < entity.length,
    getinbounds: (entity, index) =>
      LIB.BINAR.get(
        entity,
        LIB.MATH.clamp(index, 0, LIB.BINAR.length(entity) - 1)
      ),
    append: (entity, item) => {
      LIB.BINAR.addtoright(entity, item)
      return entity
    },
    prepend: (entity, item) => {
      LIB.BINAR.addtoleft(entity, item)
      return entity
    },
    cut: entity => {
      if (LIB.BINAR.offsetright(entity) === 0) LIB.BINAR.balance(entity)
      const out = LIB.BINAR.last(entity)
      LIB.BINAR.removefromright(entity)
      return out
    },
    chop: entity => {
      if (LIB.BINAR.offsetleft(entity) === 0) LIB.BINAR.balance(entity)
      const out = LIB.BINAR.first(entity)
      LIB.BINAR.removefromleft(entity)
      return out
    },
    head: entity => {
      if (LIB.BINAR.offsetright(entity) === 0) LIB.BINAR.balance(entity)
      LIB.BINAR.removefromright(entity)
      return entity
    },
    tail: entity => {
      if (LIB.BINAR.offsetleft(entity) === 0) LIB.BINAR.balance(entity)
      LIB.BINAR.removefromleft(entity)
      return entity
    },
    to: (entity, callback, initial) => {
      initial = initial ?? LIB.BINAR.makebinar()
      const len = LIB.BINAR.length(entity)
      for (let i = 0; i < len; i += 1)
        initial = callback(initial, LIB.BINAR.get(entity, i), i, entity)
      return initial
    },
    rotateleft: (entity, n = 1) => {
      n = n % LIB.BINAR.length(entity)
      for (let i = 0; i < n; i += 1) {
        if (LIB.BINAR.offsetleft(entity) === 0) LIB.BINAR.balance(entity)
        LIB.BINAR.addtoright(entity, LIB.BINAR.first(entity))
        LIB.BINAR.removefromleft(entity)
      }
      return entity
    },
    rotateright: (entity, n = 1) => {
      n = n % LIB.BINAR.length(entity)
      for (let i = 0; i < n; i += 1) {
        if (LIB.BINAR.offsetright(entity) === 0) LIB.BINAR.balance(entity)
        LIB.BINAR.addtoleft(entity, LIB.BINAR.last(entity))
        LIB.BINAR.removefromright(entity)
      }
      return entity
    },
    rotate: (entity, n = 1, direction = 1) => {
      return direction === 1
        ? LIB.BINAR.rotateright(entity, n)
        : LIB.BINAR.rotateleft(entity, n)
    },
    flat: (entity, levels = 1) => {
      const flat =
        levels === Infinity
          ? collection => LIB.BINAR.flatten(collection, levels, flat)
          : (collection, levels) => {
              levels -= 1
              return levels === -1
                ? collection
                : LIB.BINAR.flatten(collection, levels, flat)
            }
      return LIB.BINAR.fill(LIB.BINAR.makebinar(), ...flat(entity, levels))
    },
    swap: (entity, i1, i2) => {
      const temp = LIB.BINAR.get(entity, i1)
      LIB.BINAR.set(entity, i1, LIB.BINAR.get(entity, i2))
      LIB.BINAR.set(entity, i2, temp)
      return entity
    },
    swapremoveRight: (entity, index) => {
      LIB.BINAR.set(entity, index, LIB.BINAR.cut(entity))
      return entity
    },
    swapremoveLeft: (entity, index) => {
      LIB.BINAR.set(entity, index, LIB.BINAR.chop(entity))
      return entity
    },
    compact: entity => LIB.BINAR.filter(entity, Boolean),
    union: (entity, b) => {
      const a = entity
      const out = LIB.BINAR.makebinar()
      const A = new Set(LIB.BINAR.toarray(a))
      const B = new Set(LIB.BINAR.toarray(b))
      A.forEach(item => LIB.BINAR.append(out, item))
      B.forEach(item => LIB.BINAR.append(out, item))
      return LIB.BINAR.balance(out)
    },
    symetricdifference: (entity, b) => {
      const a = entity
      const out = LIB.BINAR.makebinar()
      const A = new Set(LIB.BINAR.toarray(a))
      const B = new Set(LIB.BINAR.toarray(b))
      B.forEach(item => !A.has(item) && LIB.BINAR.append(out, item))
      A.forEach(item => !B.has(item) && LIB.BINAR.append(out, item))
      return LIB.BINAR.balance(out)
    },
    intersection: (entity, b) => {
      const a = entity
      const out = LIB.BINAR.makebinar()
      const A = new Set(LIB.BINAR.toarray(a))
      const B = new Set(LIB.BINAR.toarray(b))
      B.forEach(item => A.has(item) && LIB.BINAR.append(out, item))
      return LIB.BINAR.balance(out)
    },
    difference: (entity, b) => {
      const a = entity
      const out = LIB.BINAR.makebinar()
      const A = new Set(LIB.BINAR.toarray(a))
      const B = new Set(LIB.BINAR.toarray(b))
      A.forEach(item => !B.has(item) && LIB.BINAR.append(out, item))
      return LIB.BINAR.balance(out)
    },
    partition: (entity, groups = 1) =>
      LIB.BINAR.balance(
        LIB.BINAR.to(entity, (acc, _, index, arr) => {
          if (index % groups === 0) {
            const part = LIB.BINAR.makebinar()
            for (let i = 0; i < groups; i += 1) {
              const current = LIB.BINAR.get(arr, index + i)
              if (current !== undefined) LIB.BINAR.append(part, current)
            }
            LIB.BINAR.balance(part)
            LIB.BINAR.append(acc, part)
          }
          return acc
        })
      ),
    unique: entity => {
      const set = new Set()
      return LIB.BINAR.fill(
        LIB.BINAR.makebinar(),
        ...LIB.BINAR.to(
          entity,
          (acc, item) => {
            if (!set.has(item)) {
              set.add(item)
              acc.push(item)
            }
            return acc
          },
          []
        )
      )
    },
    duplicates: entity => {
      const set = new Set()
      const extra = []
      const out = LIB.BINAR.to(
        entity,
        (acc, item) => {
          set.has(item) ? acc.push(item) : set.add(item)
          return acc
        },
        []
      )
      out.forEach(item => {
        if (set.has(item)) {
          set.delete(item)
          extra.push(item)
        }
      })
      return LIB.BINAR.fill(LIB.BINAR.makebinar(), ...out.concat(extra))
    },
  },
  DOM: {
    NAME: 'DOM',
    getbody: () => document.body,
    getparentnode: element => element.parentNode,
    getelementbyid: id => document.getElementById(id),
    getelementsbyclassname: tag => document.getElementsByClassName(tag),
    getelementsbytagname: tag => document.getElementsByTagName(tag),
    makeuserinterface: () => {
      const div = document.createElement('div')
      div.id = '_user-interface'
      // const styles = document.createElement('style')
      // styles.textContent = ``
      // document.body.appendChild(styles)
      document.body.appendChild(div)
      // LIB.EVENTS.userInterface = div
    },
    makeinput: (width = '100px', height = '100px', settings) => {
      const element = document.createElement('input')
      element.classList.add('_user-interface-input')
      element.width = width
      element.height = height
      for (const setting in settings) {
        element.setAttribute(setting, settings[setting])
      }
      return element
    },
    maketextarea: settings => {
      const element = document.createElement('textarea')
      element.classList.add('_user-interface-textarea')
      for (const setting in settings) {
        element.setAttribute(setting, settings[setting])
      }
      return element
    },
    makecheckbox: () => {
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      return checkbox
    },
    makeslider: settings => {
      const element = document.createElement('input')
      element.type = 'range'
      element.classList.add('_user-interface-slider')

      for (const setting in settings) {
        element.setAttribute(setting, settings[setting])
      }
      return element
    },
    copyfromelement: copyElement => {
      copyElement.select()
      copyElement.setSelectionRange(0, 99999)
      navigator.clipboard.writeText(copyElement.value)
    },
    copyfromtext: val => {
      navigator.clipboard.writeText(val)
    },
    maketooltip: defaultLabel => {
      const tooltip = document.createElement('span')
      tooltip.classList.add('_user-interface-tooltiptext')
      tooltip.textContent = defaultLabel
      return tooltip
    },
    makebutton: () => {
      const element = document.createElement('button')
      element.classList.add('_user-interface-button')
      return element
    },
    makelabel: (element, label) => {
      element.textContent = label
      return element
    },

    makeparagraph: content => {
      const element = document.createElement('p')
      element.textContent = content
      return element
    },
    makespan: content => {
      const element = document.createElement('span')
      element.textContent = content
      element.classList.add('_user-interface-span')
      return element
    },
    getattribute: (element, key) => element.getattribute(key),
    setattribute: (element, key, value) => {
      element.setAttribute(key, value)
      return element
    },
    setstyle: (element, style) => {
      element.style = style
      return element
    },
    makecontainer: (...elements) => {
      const div = document.createElement('div')
      elements.forEach(element => div.appendChild(element))
      document.body.appendChild(div)
      return div
    },
    addclass: (element, ...classlist) => {
      classlist.forEach(cls => element.classList.add('_user-interface-' + cls))
      return element
    },
    insertintocontainer: (container, ...elements) => {
      elements.forEach(element => container.appendChild(element))
      return container
    },
    removeselffromcontainer: (...elements) =>
      elements.forEach(element => element.parentNode.removeChild(element)),
  },
  STYLE: {
    NAME: 'STYLE',
    displayshow: element => {
      element.style.display = 'block'
      return element
    },
    displayhide: element => {
      element.style.display = 'none'
      return element
    },
    makeclass: (name, attr) => {
      let out = ''
      for (const a in attr) {
        out += `${a}: ${attr[a]};`
      }
      return `._user-interface-${name} {\n${out}\n}`
    },
    makesvgstyle: (entity, props) => {
      for (const prop in props) {
        entity.renderer.elem.style[prop] = props[prop]
      }
      return entity.renderer.elem
    },
    styleoption: attr => {
      let out = ''
      for (const a in attr) {
        out += `${a}: ${attr[a]};`
      }
      return out
    },
  },
  EVENT: {
    NAME: 'EVENT',
    oninputchange: (element, callback) => {
      element.addEventListener('change', callback)
      return element
    },
    onmouseclick: (element, callback) => {
      element.addEventListener('click', callback)
      return element
    },
    onkeydown: (element, callback) => {
      element.addEventListener('keydown', callback)
      return element
    },
    onkeyup: (element, callback) => {
      element.addEventListener('keyup', callback)
      return element
    },
  },
}

export const STD = {
  void: VOID,
  VOID,
  _: VOID,
  null: VOID,
  NULL: VOID,
  IMP: module => {
    console.log(
      `<- [${Object.keys(module)
        .filter(x => x !== 'NAME')
        .map(x => `"${x}"`)
        .join(';')}] [${module.NAME}];\n`
    )
  },

  tco:
    func =>
    (...args) => {
      let result = func(...args)
      while (typeof result === 'function') result = result()
      return result
    },
  LIB,
}
