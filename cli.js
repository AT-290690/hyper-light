import { encodeUrl } from './language/misc/compression.js'
import { readFileSync } from 'fs'
import { interpred } from './language/misc/fs.js'

export const encode = path => encodeUrl(readFileSync(path, 'utf8'))
export const link = path =>
  `https://at-290690.github.io/hyper-light/preview.html?s=${encode(path)}`
export const evaluate = path => interpred(readFileSync(path, 'utf8'))
