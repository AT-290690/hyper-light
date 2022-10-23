import { compress, encodeBase64 } from './language/misc/compression.js'
import { readFileSync } from 'fs'
import { interpred } from './language/misc/fs.js'
import { LZUTF8 } from './language/libs/lz-utf8.js'

export const encode = path => encodeBase64(readFileSync(path, 'utf8'))
export const link = path =>
  `https://at-290690.github.io/hyper-light/preview.html?s=${encode(path)}`

export const evaluate = path => interpred(readFileSync(path, 'utf8'))
export const zip = path =>
  LZUTF8.compress(compress(readFileSync(path, 'utf8')), {
    outputEncoding: 'StorageBinaryString',
  })
export const unzip = path =>
  LZUTF8.decompress(readFileSync(path, 'utf8'), {
    inputEncoding: 'Base64',
    outputEncoding: 'String',
  })
