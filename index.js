import { readFileSync } from 'fs'
import { compile, interpred, interpredBrowser } from './language/core/fs.js'

interpred(readFileSync('./programms/parens.rs', 'utf8'))
compile(readFileSync('./programms/rect.rs', 'utf8'), './dist/rect.html')
// for debugging
// interpredBrowser(
//   readFileSync('./programms/rect.rs', 'utf8'),
//   './dist/rect2.html'
// )
