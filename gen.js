import { link } from './cli.js'
console.log(`
here is the link:
${link('./programms/tree.rs')}

## More examples

animations are also supported:
${link('./programms/rose.rs')}

user interface:
${link('./programms/hello.rs')}

game of life: 
${link('./programms/gol.rs')}

`)