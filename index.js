import { readFileSync } from 'fs'
import { compile, interpred, interpredBrowser } from './language/misc/fs.js'
import { decodeUrl, encodeUrl } from './language/misc/utils.js'

// console.log(encodeUrl(readFileSync('./programms/parens.rs', 'utf8')))
// console.log(
//   decodeUrl(
//     'PC1bIkJJTkFSIjsiQVJSQVkiOyJMT0dJQyJdW0xJQlJBUlldO8QlZnJvbSI7InRvIjsiYmFsYW5jZSI7ImFwcGVuZCI7InByZccKdGFpbCI7ImZpcnN0IjsiaXMgZW1wdHkiXVvFaF07Oj1baXN2YWxpZHBhcmVuczstPltpbnB1dDt8yQnEbltdO3x0b1stPlthY2M7eDtpbmRleDthcnI7P1s9PVsiKCI7eF07x3nGJF3GG8V8xBJdOyIoIl075ACTxg/mALDGLSc1O3xpc+UAnVsnNDvtAJRbIigoKSkiXTs='
//   )
// )
// interpred(readFileSync('./programms/parens.rs', 'utf8'))
compile(readFileSync('./programms/rect.rs', 'utf8'), './dist/rect.html')
// for debugging
// interpredBrowser(
//   readFileSync('./programms/rect.rs', 'utf8'),
//   './dist/rect2.html'
// )
