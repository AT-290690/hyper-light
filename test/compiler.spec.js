import { compileModule } from '../language/misc/utils'

const UTIL = `const VOID = null;
const _tco = func => (...args) => { let result = func(...args); while (typeof result === 'function') { result = result(); }; return result };
const _pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const _spread = (items) => Array.isArray(items[0]) ? items.reduce((acc, item) => [...acc, ...item], []) : items.reduce((acc, item) => ({ ...acc, ...item }), {});
const protolessModule = methods => { const env = Object.create(null); for (const method in methods) env[method] = methods[method]; return env;};
const LIBRARY = {}`

describe('run should work as expected', () => {
  it('definitions', () => {
    expect(compileModule(`:= [fn; -> [x; * [x; 10]]]; fn [3];`).trim()).toEqual(
      `${UTIL}
var fn;(()=>{(void(fn=(x) => { return  (x*10)})||fn);return fn(3);})()`.trim()
    )
  })
  it('definitions', () => {
    expect(
      compileModule(
        `:= [x; 10]; := [y; 3]; := [temp; x]; = [x; y]; = [y; temp]; :: ["x"; x; "y"; y]`
      ).trim()
    ).toEqual(
      `${UTIL}
var x,y,temp;(()=>{(void(x=10)||x);(void(y=3)||y);(void(temp=x)||temp);(void(x=y)||x);(void(y=temp)||y);return {"x":x,"y":y,}})()`.trim()
    )
  })
})
