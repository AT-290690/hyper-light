import evaluate from './interpreter.js'

const extract = (item, env) =>
  item.type === 'value' ? item.value : evaluate(item, env)
export const VOID = undefined
export const pipe =
  (...fns) =>
  x =>
    fns.reduce((v, f) => f(v), x)

const tokens = {
  ['+']: (args, env) => {
    if (args.length < 2) throw new TypeError('Invalid number of arguments to +')
    const operands = args.map(a => evaluate(a, env))
    if (operands.some(n => typeof n !== 'number'))
      throw new TypeError('Invalid use of + (Not all args are numbers)')
    const [first, ...rest] = operands
    return rest.reduce((acc, x) => (acc += x), first)
  },
  ['-']: (args, env) => {
    if (args.length < 2) throw new TypeError('Invalid number of arguments to -')
    const operands = args.map(a => evaluate(a, env))
    if (operands.some(n => typeof n !== 'number'))
      throw new TypeError('Invalid use of - (Not all args are numbers)')
    const [first, ...rest] = operands
    return rest.reduce((acc, x) => (acc -= x), first)
  },
  ['*']: (args, env) => {
    if (args.length < 2) throw new TypeError('Invalid number of arguments to *')
    const operands = args.map(a => evaluate(a, env))
    if (operands.some(n => typeof n !== 'number'))
      throw new TypeError('Invalid use of * (Not all args are numbers)')
    const [first, ...rest] = operands
    return rest.reduce((acc, x) => (acc *= x), first)
  },
  [':']: (args, env) => {
    if (args.length < 2) throw new TypeError('Invalid number of arguments to :')
    const operands = args.map(a => evaluate(a, env))
    if (operands.some(n => typeof n !== 'number'))
      throw new TypeError('Invalid use of : (Not all args are numbers)')
    const [first, ...rest] = operands
    if (rest.includes(0))
      throw new RangeError('Invalid operation to : (devision by zero)')
    return rest.reduce((acc, x) => (acc /= x), first)
  },
  ['%']: (args, env) => {
    if (args.length !== 2)
      throw new TypeError('Invalid number of arguments to %')
    const operands = args.map(a => evaluate(a, env))
    if (operands.some(n => typeof n !== 'number'))
      throw new TypeError('Invalid use of % (Not all args are numbers)')
    const [left, right] = operands
    return left % right
  },
  ['~']: (args, env) => {
    if (args.length < 2) throw new TypeError('Invalid number of arguments to `')
    const operands = args.map(a => evaluate(a, env))
    if (operands.some(n => typeof n !== 'string'))
      throw new TypeError('Invalid use of ` (Not all args are strings)')
    const [first, ...rest] = operands
    return rest.reduce((acc, x) => (acc += x), first)
  },
  ['?']: (args, env) => {
    if (args.length > 3 || args.length <= 1)
      throw new TypeError('Invalid number of arguments to ?')
    if (!!evaluate(args[0], env)) return evaluate(args[1], env)
    else if (args[2]) return evaluate(args[2], env)
    else return 0
  },
  ['!']: (args, env) => {
    if (args.length !== 1)
      throw new TypeError('Invalid number of arguments to !')
    return +!extract(args[0], env)
  },
  ['==']: (args, env) => {
    if (args.length < 2)
      throw new TypeError('Invalid number of arguments to ==')
    const [first, ...rest] = args.map(a => evaluate(a, env))
    return +rest.every(x => first === x)
  },
  ['!=']: (args, env) => {
    if (args.length < 2)
      throw new TypeError('Invalid number of arguments to !=')
    const [first, ...rest] = args.map(a => evaluate(a, env))
    return +rest.every(x => first !== x)
  },
  ['>']: (args, env) => {
    if (args.length < 2) throw new TypeError('Invalid number of arguments to >')
    const [first, ...rest] = args.map(a => evaluate(a, env))
    return +rest.every(x => first > x)
  },
  ['<']: (args, env) => {
    if (args.length < 2) throw new TypeError('Invalid number of arguments to <')
    const [first, ...rest] = args.map(a => evaluate(a, env))
    return +rest.every(x => first < x)
  },
  ['>=']: (args, env) => {
    if (args.length < 2)
      throw new TypeError('Invalid number of arguments to >=')
    const [first, ...rest] = args.map(a => evaluate(a, env))
    return +rest.every(x => first >= x)
  },
  ['<=']: (args, env) => {
    if (args.length < 2)
      throw new TypeError('Invalid number of arguments to <=')
    const [first, ...rest] = args.map(a => evaluate(a, env))
    return +rest.every(x => first <= x)
  },
  ['&&']: (args, env) => {
    if (args.length === 0)
      throw new TypeError('Invalid number of arguments to &&')
    for (let i = 0; i < args.length - 1; ++i)
      if (!!evaluate(args[i], env)) continue
      else return evaluate(args[i], env)
    return evaluate(args[args.length - 1], env)
  },
  ['||']: (args, env) => {
    if (args.length === 0)
      throw new TypeError('Invalid number of arguments  to ||')
    for (let i = 0; i < args.length - 1; ++i)
      if (!!evaluate(args[i], env)) return evaluate(args[i], env)
      else continue
    return evaluate(args[args.length - 1], env)
  },
  ['??']: (args, env) => {
    if (args.length === 0)
      throw new TypeError('Invalid number of arguments  to ??')
    const resolve = (arg, count) => {
      const val = evaluate(arg, env)
      if (val !== VOID) return val
      else return resolve(args[count], ++count)
    }
    return resolve(args[0], 0)
  },
  ['..']: (args, env) => {
    let value = VOID
    args.forEach(arg => (value = evaluate(arg, env)))
    return value
  },
  [':=']: (args, env) => {
    if (!args.length || args?.[0].type !== 'word' || args.length > 2)
      throw new SyntaxError('Invalid use of operation :=')
    if (args[0].name.includes('.') || args[0].name.includes('-'))
      throw new SyntaxError(
        'Invalid use of operation := (variable name must not contain . or -)'
      )
    const value =
      args.length === 1 ? VOID : evaluate(args[args.length - 1], env)
    env[args[0].name] = value
    return value
  },
  ['->']: (args, env) => {
    if (!args.length) throw new SyntaxError('Functions need a body')
    const argNames = args.slice(0, args.length - 1).map(expr => {
      if (expr.type !== 'word')
        throw new TypeError('Argument names must be words')
      return expr.name
    })
    const body = args[args.length - 1]
    return (...args) => {
      if (args.length !== argNames.length)
        throw new TypeError(
          'Invalid number of arguments near ("' + argNames.join('; ') + '")'
        )
      const localEnv = Object.create(env)
      for (let i = 0; i < args.length; ++i) localEnv[argNames[i]] = args[i]
      return evaluate(body, localEnv)
    }
  },
  ['=']: (args, env) => {
    if (args.length !== 2 || args[0].type !== 'word')
      throw new SyntaxError('Invalid use of operation =')
    const entityName = args[0].name
    const value = evaluate(args[1], env)
    for (let scope = env; scope; scope = Object.getPrototypeOf(scope))
      if (Object.prototype.hasOwnProperty.call(scope, entityName)) {
        scope[entityName] = value
        return value
      }
    throw new ReferenceError(
      `Tried setting an undefined variable: ${entityName}`
    )
  },
  ['.=']: (args, env) => {
    const main = args[0]
    const last = args[args.length - 1]
    const prop = []
    for (let i = 1; i < args.length - 1; ++i) {
      const arg = args[i]
      prop.push(extract(arg, env)?.toString() ?? VOID)
    }
    const value = evaluate(last, env)
    if (main.type === 'apply') {
      const entity = evaluate(main, env)
      if (prop.length === 1) entity[prop[0]] = value
      else {
        let temp = entity
        const last = prop.pop()
        prop.forEach(item => (temp = temp[item]))
        temp[last] = value
      }
      return entity
    } else if (main.type === 'word') {
      const entityName = main.name
      for (let scope = env; scope; scope = Object.getPrototypeOf(scope))
        if (Object.prototype.hasOwnProperty.call(scope, entityName)) {
          const entity = scope[entityName]
          if (prop.length === 1) entity[prop[0]] = value
          else {
            let temp = entity
            const last = prop.pop()
            prop.forEach(item => (temp = temp[item]))
            temp[last] = value
          }
          return entity
        }
    }
  },
  ['.-']: (args, env) => {
    const prop = []
    for (let i = 1; i < args.length; ++i) {
      const arg = args[i]
      prop.push(extract(arg, env)?.toString() ?? VOID)
    }
    const entityName = args[0].name
    for (let scope = env; scope; scope = Object.getPrototypeOf(scope))
      if (Object.prototype.hasOwnProperty.call(scope, entityName)) {
        if (prop.length === 1) {
          scope[entityName][prop[0]]
          delete scope[entityName][prop[0]]
          return scope[entityName]
        } else {
          let temp = scope[entityName]
          const last = prop.pop()
          prop.forEach(item => (temp = temp[item]))
          //const value = temp[last];
          delete temp[last]
          return scope[entityName]
        }
      }
  },
  ['.']: (args, env) => {
    const prop = []
    for (let i = 1; i < args.length; ++i) {
      const arg = args[i]
      prop.push(extract(arg, env)?.toString() ?? VOID)
    }
    if (args[0].type === 'apply' || args[0].type === 'value') {
      const entity = evaluate(args[0], env)
      if (prop.length === 1) {
        const entityProperty = entity[prop[0]]
        if (typeof entityProperty === 'function') {
          const caller = entity
          const fn = entityProperty
          return fn.bind(caller)
        } else return entityProperty ?? VOID
      } else {
        let temp = entity
        const last = prop.pop()
        prop.forEach(item => (temp = temp[item]))
        const entityProperty = temp[last]
        if (typeof entityProperty === 'function') {
          const caller = temp
          const fn = entityProperty
          return fn.bind(caller)
        } else return entityProperty ?? VOID
      }
    } else {
      const entityName = args[0].name
      for (let scope = env; scope; scope = Object.getPrototypeOf(scope))
        if (Object.prototype.hasOwnProperty.call(scope, entityName)) {
          if (prop.length === 1) {
            const entityProperty = scope[entityName][prop[0]]
            if (typeof entityProperty === 'function') {
              const caller = scope[entityName]
              const fn = entityProperty
              return fn.bind(caller)
            } else return entityProperty ?? VOID
          } else {
            let temp = scope[entityName]
            const last = prop.pop()
            prop.forEach(item => (temp = temp[item]))
            const entityProperty = temp[last]
            if (typeof entityProperty === 'function') {
              const caller = temp
              const fn = entityProperty
              return fn.bind(caller)
            } else return entityProperty ?? VOID
          }
        }
    }
  },
  ['...']: (args, env) => {
    if (!args.length) throw new TypeError('Invalid number of arguments to ...')
    const [first, ...rest] = args
    const toSpread = evaluate(first, env)
    if (typeof toSpread !== 'object')
      throw new SyntaxError('... can only be used on .: or ::')
    return Array.isArray(toSpread)
      ? [
          ...toSpread,
          ...rest.reduce((acc, item) => [...acc, ...evaluate(item, env)], []),
        ]
      : {
          ...toSpread,
          ...rest.reduce(
            (acc, item) => ({ ...acc, ...evaluate(item, env) }),
            {}
          ),
        }
  },
  ['::']: (args, env) => {
    let count = 0
    return Object.fromEntries(
      args.reduce((acc, item, i) => {
        if (i % 2) {
          acc[count].push(extract(item, env))
          count++
        } else {
          const key = extract(item, env)
          if (typeof key !== 'string') {
            throw new SyntaxError(
              'Invalid use of operation :: (Only strings can be used as keys)'
            )
          }
          acc[count] = [key]
        }
        return acc
      }, [])
    )
  },
  ['.:']: (args, env) => args.map(item => extract(item, env)),
  ['<-']:
    (args, env) =>
    (exp, prefix = '') => {
      if (prefix.length > 4)
        throw new TypeError(
          'Invalid prefix for <- (prefix can be no longer than 4 characters)'
        )
      if (args[0].value === '*')
        for (const method in exp) env[`${prefix}${method}`] = exp[method]
      else
        args.forEach(arg => {
          const method = arg.value
          env[`${prefix}${method}`] = exp[method]
        })
      return VOID
    },
  ['|>']: (args, env) => {
    const [param, ...rest] = args
    return pipe(...rest.map(arg => p => evaluate(arg, env)(p)))(
      param.type === 'apply' || param.type === 'word'
        ? evaluate(param, env)
        : param.value
    )
  },
}
tokens['~='] = tokens[':=']
export { tokens }
