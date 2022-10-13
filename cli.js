import { encodeUrl } from './language/misc/utils.js'
import { readFileSync } from 'fs'
export const encode = path => encodeUrl(readFileSync(path, 'utf8'))
export const link = path =>
  `https://at-290690.github.io/toy_lang/index.html?s=${encode(path)}`
