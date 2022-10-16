import { readFileSync } from 'fs'
import { STD, TWO_JS_HTML } from './language/extentions/extentions.js'
import {
  decodeUrl,
  encodeUrl,
  shortModules,
} from './language/misc/compression.js'
import { compile, interpred, interpredBrowser } from './language/misc/fs.js'
import { compileModule } from './language/misc/utils.js'

// console.log(interpred(readFileSync('./programms/binar.rs', 'utf8')))
// console.log(compileModule('. ["sda"; "length"]'))
// console.log(
//   decodeUrl(
//     'PC1bIkJJTkFSIjsiQVJSQVkiOyJMT0dJQyJdW0xJQlJBUlldO8QlZnJvbSI7InRvIjsiYmFsYW5jZSI7ImFwcGVuZCI7InByZccKdGFpbCI7ImZpcnN0IjsiaXMgZW1wdHkiXVvFaF07Oj1baXN2YWxpZHBhcmVuczstPltpbnB1dDt8yQnEbltdO3x0b1stPlthY2M7eDtpbmRleDthcnI7P1s9PVsiKCI7eF07x3nGJF3GG8V8xBJdOyIoIl075ACTxg/mALDGLSc1O3xpc+UAnVsnNDvtAJRbIigoKSkiXTs='
//   )
// )
// interpred(readFileSync('./programms/parens.rs', 'utf8'))
// compile(
//   readFileSync('./programms/tree.rs', 'utf8'),
//   './dist/tree.html',
//   TWO_JS_HTML
// )
// compile(readFileSync('./programms/monster.rs', 'utf8'), './dist/monster.html', TWO_JS_HTML)
// interpred(readFileSync('./programms/switchcase.rs', 'utf8'))
// console.log(
//   compileModule(
//     `<-["SKETCH";"ARRAY";"OBJECT";"MATH"][UNIVERSE];<-["make scene";"make group";"make rectangle";"update";"play";"draw";"insert into group";"background";"width";"height";"set position";"set fill";"set stroke";"no fill";"no stroke"][SKETCH];<-["push";"for each"][ARRAY];<-["for of"][OBJECT];<-["randomint"][MATH;"roll"];:=[N;50];:=[factor;0.25];:=[r;*[N;factor]];:=[h;*[r;factor;-1]];:=[COLORS;.:["black";"crimson"]];:=[cols;N];:=[rows;N];:=[cells;.:[]];:=[getcell;->[x;y;.[cells;+[x;*[rows;y]]]]];:=[makegrid;->[cells;..[:=[cellscontainer;makegroup[]];~=[loop;->[count;bounds;..[?[![%[count;cols]];=[h;+[h;r]]];:=[isalive;randomint[0;1]];:=[nextisalive;randomint[0;1]];:=[rect;|>[makerectangle[%[*[count;r];*[r;cols]];h;r;r];|setfill[.[COLORS;isalive]];|nostroke[]]];:=[cell;::["state";::["alive";isalive;"next";nextisalive];"render";rect]];insertintogroup[cellscontainer;rect];push[cells;cell];?[>[bounds;count];loop[=[count;+[count;1]];bounds]]]]];loop[0;-[*[rows;cols];1]];cellscontainer]]];:=[iteratecells;->[cells;callback;..[:=[y;-1];foreach[cells;->[cell;i;cells;..[=[y;?[%[i;rows];y;=[y;+[y;1]]]];:=[x;%[i;cols]];:=[cell;getcell[x;y]];callback[cell;x;y]]]]]]];:=[directions;.:[::["x";0;"y";1];::["x";1;"y";0];::["x";-1;"y";0];::["x";0;"y";-1];::["x";1;"y";-1];::["x";-1;"y";-1];::["x";1;"y";1];::["x";-1;"y";1]]];:=[adjacent;->[x;y;..[:=[sum;0];forof[directions;->[dir;..[<-["x";"y"][dir;"dir"];:=[cell;getcell[+[x;dirx];+[y;diry]]];=[sum;+[sum;?[cell;.[cell;"state";"alive"];0]]]]]];sum]]];:=[updatestate;->[iteratecells[cells;->[cell;x;y;..[:=[isalive;.[cell;"state";"alive"]];:=[neighbors;adjacent[x;y]];?[&&[isalive;<[neighbors;2]];.=[cell;"state";"next";0];?[&&[isalive;>[neighbors;3]];.=[cell;"state";"next";0];?[&&[![isalive];==[neighbors;3]];.=[cell;"state";"next";1]]]]]]]]];:=[trottle;->[delta;value;callback;?[![%[delta;value]];callback[]]]];:=[render;->[iteratecells[cells;->[cell;x;y;..[:=[isalive;.[cell;"state";"alive"]];setfill[.[cell;"render"];.[COLORS;isalive]];.=[cell;"state";"alive";.[cell;"state";"next"]]]]]]];:=[lifespan;1000];makescene[1300;500;->[..[:=[cellscontainer;|>[cells;|makegrid[];|setposition[15;15]]];draw[lifespan;->[delta;fps;trottle[delta;8;->[..[updatestate[];render[]]]]]];play[]]]];`
//   )
// )
// for debugging
// interpredBrowser(
//   readFileSync('./programms/rect.rs', 'utf8'),
//   './dist/rect2.html'
// )
// console.log(encodeUrl(':= [x; 10]; * [x; 2];'))
console.log(encodeUrl(readFileSync('./programms/gol.rs', 'utf8')))

// compile(readFileSync('./programms/todo.rs', 'utf8'), './dist/todo.html')
// console.log(encodeUrl(readFileSync('./programms/gol.rs', 'utf8')))
// compile(readFileSync('./programms/monster.rs', 'utf8'), './dist/monster.html', TWO_JS_HTML)
// interpred(readFileSync('./programms/switchcase.rs', 'utf8'))
// console.log(
//   compileModule(
//     `<-["SKETCH";"ARRAY";"OBJECT";"MATH"][UNIVERSE];<-["make scene";"make group";"make rectangle";"update";"play";"draw";"insert into group";"background";"width";"height";"set position";"set fill";"set stroke";"no fill";"no stroke"][SKETCH];<-["push";"for each"][ARRAY];<-["for of"][OBJECT];<-["randomint"][MATH;"roll"];:=[N;50];:=[factor;0.25];:=[r;*[N;factor]];:=[h;*[r;factor;-1]];:=[COLORS;.:["black";"crimson"]];:=[cols;N];:=[rows;N];:=[cells;.:[]];:=[getcell;->[x;y;.[cells;+[x;*[rows;y]]]]];:=[makegrid;->[cells;..[:=[cellscontainer;makegroup[]];~=[loop;->[count;bounds;..[?[![%[count;cols]];=[h;+[h;r]]];:=[isalive;randomint[0;1]];:=[nextisalive;randomint[0;1]];:=[rect;|>[makerectangle[%[*[count;r];*[r;cols]];h;r;r];|setfill[.[COLORS;isalive]];|nostroke[]]];:=[cell;::["state";::["alive";isalive;"next";nextisalive];"render";rect]];insertintogroup[cellscontainer;rect];push[cells;cell];?[>[bounds;count];loop[=[count;+[count;1]];bounds]]]]];loop[0;-[*[rows;cols];1]];cellscontainer]]];:=[iteratecells;->[cells;callback;..[:=[y;-1];foreach[cells;->[cell;i;cells;..[=[y;?[%[i;rows];y;=[y;+[y;1]]]];:=[x;%[i;cols]];:=[cell;getcell[x;y]];callback[cell;x;y]]]]]]];:=[directions;.:[::["x";0;"y";1];::["x";1;"y";0];::["x";-1;"y";0];::["x";0;"y";-1];::["x";1;"y";-1];::["x";-1;"y";-1];::["x";1;"y";1];::["x";-1;"y";1]]];:=[adjacent;->[x;y;..[:=[sum;0];forof[directions;->[dir;..[<-["x";"y"][dir;"dir"];:=[cell;getcell[+[x;dirx];+[y;diry]]];=[sum;+[sum;?[cell;.[cell;"state";"alive"];0]]]]]];sum]]];:=[updatestate;->[iteratecells[cells;->[cell;x;y;..[:=[isalive;.[cell;"state";"alive"]];:=[neighbors;adjacent[x;y]];?[&&[isalive;<[neighbors;2]];.=[cell;"state";"next";0];?[&&[isalive;>[neighbors;3]];.=[cell;"state";"next";0];?[&&[![isalive];==[neighbors;3]];.=[cell;"state";"next";1]]]]]]]]];:=[trottle;->[delta;value;callback;?[![%[delta;value]];callback[]]]];:=[render;->[iteratecells[cells;->[cell;x;y;..[:=[isalive;.[cell;"state";"alive"]];setfill[.[cell;"render"];.[COLORS;isalive]];.=[cell;"state";"alive";.[cell;"state";"next"]]]]]]];:=[lifespan;1000];makescene[1300;500;->[..[:=[cellscontainer;|>[cells;|makegrid[];|setposition[15;15]]];draw[lifespan;->[delta;fps;trottle[delta;8;->[..[updatestate[];render[]]]]]];play[]]]];`
//   )
// )
