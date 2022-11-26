import { compileModule } from '../language/misc/utils'

const UTIL = `const VOID = null;
const _tco = func => (...args) => { let result = func(...args); while (typeof result === 'function') { result = result(); }; return result };
const _pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const _node = (...args) => { const [val, ...rest] = args; return { '*': val, '=>': rest ? rest.map(args => _node(args)) : VOID }}
const _spread = (items) => Array.isArray(items[0]) ? items.reduce((acc, item) => [...acc, ...item], []) : items.reduce((acc, item) => ({ ...acc, ...item }), {});
const _scanLeft = (array, callback) => { for (let i = 0; i < array.length; ++i) callback(array[i], i) ;return array } 
const _scanRight = (array, callback) => {  for (let i = array.length - 1; i >= 0; --i) callback(array[i], i) ;return array }
const call = (x, fn) => fn(x); 
const printout = (...args) => console.log(...args);
const protolessModule = methods => { const env = Object.create(null); for (const method in methods) env[method] = methods[method]; return env;};
const LIBRARY = {}`

describe('run should work as expected', () => {
  it('definitions', () => {
    expect(compileModule(`:= [fn; -> [x; * [x; 10]]]; fn [3];`).trim()).toEqual(
      `${UTIL}
var fn;(()=>{((fn=(x) => { return  (x*10)}),fn);return fn(3);})()`.trim()
    )
  })
  it('definitions', () => {
    expect(
      compileModule(
        `:= [x; 10]; := [y; 3]; := [temp; x]; = [x; y]; = [y; temp]; :: ["x"; x; "y"; y]`
      ).trim()
    ).toBe(
      `${UTIL}
var x,y,temp;(()=>{((x=10),x);((y=3),y);((temp=x),temp);((x=y),x);((y=temp),y);return {"x":x,"y":y,}})()`.trim()
    )
  })
  it('swtich statement', () => {
    expect(
      'var CONSOLE' +
        compileModule(
          `<- ["CONSOLE"] [LIBRARY];
          <- ["consolelog"] [CONSOLE];
          := [switchcase; -> [matcher; 
            ?? [
            . [:: [
              "knock knock"; -> [..["who's there"]]; 
              "meaning of life"; -> [..[42]];
              ;; add more cases here
              ;; ...
            ]; matcher]; 
              ;; default case
            -> ["nothing matched"]
          ][]]];
          .: [switch case ["meaning of life"]; switch case [0]; switch case  ["knock knock"]];`
        )
          .split('var CONSOLE')[1]
          .trim()
    ).toBe(
      `var CONSOLE,consolelog,switchcase;(()=>{CONSOLE = LIBRARY[\"CONSOLE\"];consolelog = CONSOLE[\"consolelog\"];((switchcase=(matcher) => { return  ((({\"knock knock\":() => { return  (()=>{;return \"who's there\"})()},\"meaning of life\":() => { return  (()=>{;return 42})()},}[matcher])??(() => { return  \"nothing matched\"})))()}),switchcase);return [switchcase(\"meaning of life\"),switchcase(0),switchcase(\"knock knock\")]})()`
    )
  })
  it('game of life', () => {
    expect(
      'var SKETCH' +
        compileModule(
          `<- ["SKETCH"; "ARRAY"; "OBJECT"; "MATH"] [LIBRARY]; 
          <- ["makescene"; "makegroup"; "makerectangle"; "update"; "play"; "draw"; 
              "insertintogroup"; "background"; "width"; "height"; "setposition";
              "setfill"; "setstroke"; "nofill"; "nostroke"] [SKETCH]; 
          <- ["push"; "foreach"] [ARRAY]; 
          <- ["forof"] [OBJECT]; 
          <- ["randomint"] [MATH];
          
          ;; STATE
          := [N; 50]; 
          := [factor; 0.25]; 
          := [r; * [N; factor]]; 
          := [h; * [r; factor; -1]]; 
          := [COLORS; .: ["black"; "crimson"]];
          := [cols; N]; 
          := [rows; N]; 
          := [cells; .: []]; 
          := [get cell; -> [x; y; . [cells; + [x; * [rows; y]]]]]; 
          
          := [make grid; -> [cells; .. [
          := [cells container; make group []]; 
          
          ~= [loop; -> [count; bounds; .. [
            ? [! [% [count; cols]]; = [h; + [h; r]]]; 
          
            := [is alive; random int [0; 1]]; 
            := [next is alive; random int [0; 1]]; 
            := [rect; |> [make rectangle [% [* [count; r]; * [r; cols]]; h; r; r]; 
                set fill [. [COLORS; is alive]];
                no stroke []]];
            := [cell; :: ["state"; :: ["alive"; is alive; "next"; next is alive]; "render"; rect]]; 
            insert into group [cells container; rect]; 
            push [cells; cell]; 
            ? [> [bounds; count]; loop [= [count; + [count; 1]]; bounds]]]]];
          loop [0; - [* [rows; cols]; 1]]; cells container]]];
          
          := [iterate cells; -> [cells; callback; .. [
          := [y; -1]; 
          for each [cells; -> [cell; i; cells; .. [
            = [y; ? [% [i; rows]; 
            y; = [y; + [y; 1]]]]; 
            := [x; % [i; cols]]; 
            := [cell; get cell [x; y]]; 
            callback [cell; x; y]]]]]]]; 
          
          := [directions; .: [
            :: ["x"; 0; "y"; 1]; 
            :: ["x"; 1; "y"; 0]; 
            :: ["x"; -1; "y"; 0]; 
            :: ["x"; 0; "y"; -1]; 
            :: ["x"; 1; "y"; -1]; 
            :: ["x"; -1; "y"; -1]; 
            :: ["x"; 1; "y"; 1]; 
            :: ["x"; -1; "y"; 1]]]; 
          
          := [adjacent; -> [x; y; .. [
          := [sum; 0]; 
          
          for of [directions; -> [dir; .. [
            <- ["x"; "y"] [dir; "dir"]; 
            := [cell; get cell [+ [x; dirx]; 
            + [y; diry]]]; 
            = [sum; + [sum; ? [cell; . [cell; "state"; "alive"]; 0]]]]]]; sum]]];
          
          := [update state; -> [iterate cells [cells; -> [cell; x; y; .. [
            := [is alive; . [cell; "state"; "alive"]]; 
            := [neighbors; adjacent [x; y]]; 
            ? [&& [isalive; < [neighbors; 2]]; 
              .= [cell; "state"; "next"; 0]; 
                ? [&& [is alive; > [neighbors; 3]]; 
                  .= [cell; "state"; "next"; 0]; 
                     ? [&& [! [is alive]; 
                       == [neighbors; 3]]; 
            .= [cell; "state"; "next"; 1]]]]]]]]]; 
          
          := [trottle; -> [delta; value; callback; ? [! [% [delta; value]]; callback []]]];
          
          := [render; -> [iterate cells [cells; -> [cell; x; y; .. [
            := [is alive; . [cell; "state"; "alive"]]; 
            set fill [. [cell; "render"]; . [COLORS; is alive]]; 
            .= [cell; "state"; "alive"; . [cell; "state"; "next"]]]]]]]; 
          
          := [lifespan; 1000]; 
          make scene [1300; 500; -> [.. [
            := [cells container; 
            |> [cells; 
              makegrid []; 
              set position [15; 15]]]; 
            draw [lifespan; -> [delta; fps; trottle [delta; 8; -> [.. [
              update state []; 
              render []]]]]]; 
            play []]]]; `
        )
          .split('var SKETCH')[1]
          .trim()
    ).toBe(
      `var SKETCH,ARRAY,OBJECT,MATH,makescene,makegroup,makerectangle,update,play,draw,insertintogroup,background,width,height,setposition,setfill,setstroke,nofill,nostroke,push,foreach,forof,randomint,N,factor,r,h,COLORS,cols,rows,cells,getcell,makegrid,iteratecells,directions,adjacent,updatestate,trottle,render,lifespan;(()=>{SKETCH = LIBRARY[\"SKETCH\"];ARRAY = LIBRARY[\"ARRAY\"];OBJECT = LIBRARY[\"OBJECT\"];MATH = LIBRARY[\"MATH\"];makescene = SKETCH[\"makescene\"];makegroup = SKETCH[\"makegroup\"];makerectangle = SKETCH[\"makerectangle\"];update = SKETCH[\"update\"];play = SKETCH[\"play\"];draw = SKETCH[\"draw\"];insertintogroup = SKETCH[\"insertintogroup\"];background = SKETCH[\"background\"];width = SKETCH[\"width\"];height = SKETCH[\"height\"];setposition = SKETCH[\"setposition\"];setfill = SKETCH[\"setfill\"];setstroke = SKETCH[\"setstroke\"];nofill = SKETCH[\"nofill\"];nostroke = SKETCH[\"nostroke\"];push = ARRAY[\"push\"];foreach = ARRAY[\"foreach\"];forof = OBJECT[\"forof\"];randomint = MATH[\"randomint\"];((N=50),N);((factor=0.25),factor);((r=(N*factor)),r);((h=(r*factor*-1)),h);((COLORS=[\"black\",\"crimson\"]),COLORS);((cols=N),cols);((rows=N),rows);((cells=[]),cells);((getcell=(x,y) => { return  cells[(x+(rows*y))];}),getcell);((makegrid=(cells) => {var cellscontainer,__tail_loop,loop; return  (()=>{((cellscontainer=makegroup()),cellscontainer);((loop=_tco(((__tail_loop=(count,bounds) => {var isalive,nextisalive,rect,cell; return  (()=>{(!(count%cols)?((h=(h+r)),h):null);((isalive=randomint(0,1)),isalive);((nextisalive=randomint(0,1)),nextisalive);((rect=_pipe((__) => { return  setfill(__,COLORS[isalive]);},(__) => { return  nostroke(__);})(makerectangle(((count*r)%(r*cols)),h,r,r))),rect);((cell={\"state\":{\"alive\":isalive,\"next\":nextisalive,},\"render\":rect,}),cell);insertintogroup(cellscontainer,rect);push(cells,cell);return ((bounds>count)?() => { return  __tail_loop(((count=(count+1)),count),bounds);}:null);})()}),__tail_loop))),loop);loop(0,((rows*cols)-1));return cellscontainer})()}),makegrid);((iteratecells=(cells,callback) => {var y; return  (()=>{((y=-1),y);return foreach(cells,(cell,i,cells) => {var x,cell; return  (()=>{((y=((i%rows)?y:((y=(y+1)),y))),y);((x=(i%cols)),x);((cell=getcell(x,y)),cell);return callback(cell,x,y);})()});})()}),iteratecells);((directions=[{\"x\":0,\"y\":1,},{\"x\":1,\"y\":0,},{\"x\":-1,\"y\":0,},{\"x\":0,\"y\":-1,},{\"x\":1,\"y\":-1,},{\"x\":-1,\"y\":-1,},{\"x\":1,\"y\":1,},{\"x\":-1,\"y\":1,}]),directions);((adjacent=(x,y) => {var sum; return  (()=>{((sum=0),sum);forof(directions,(dir) => {var x,y,cell; return  (()=>{x = dir[\"x\"];y = dir[\"y\"];((cell=getcell((x+dirx),(y+diry))),cell);return ((sum=(sum+(cell?cell[\"state\"][\"alive\"]:0))),sum);})()});return sum})()}),adjacent);((updatestate=() => { return  iteratecells(cells,(cell,x,y) => {var isalive,neighbors; return  (()=>{((isalive=cell[\"state\"][\"alive\"]),isalive);((neighbors=adjacent(x,y)),neighbors);return (((isalive)&&((neighbors<2)))?((cell[\"state\"][\"next\"]=0), cell):(((isalive)&&((neighbors>3)))?((cell[\"state\"][\"next\"]=0), cell):(((!isalive)&&((neighbors===3)))?((cell[\"state\"][\"next\"]=1), cell):null)));})()});}),updatestate);((trottle=(delta,value,callback) => { return  (!(delta%value)?callback():null);}),trottle);((render=() => { return  iteratecells(cells,(cell,x,y) => {var isalive; return  (()=>{((isalive=cell[\"state\"][\"alive\"]),isalive);setfill(cell[\"render\"],COLORS[isalive]);return ((cell[\"state\"][\"alive\"]=cell[\"state\"][\"next\"]), cell);})()});}),render);((lifespan=1000),lifespan);return makescene(1300,500,() => {var cellscontainer; return  (()=>{((cellscontainer=_pipe((__) => { return  makegrid(__);},(__) => { return  setposition(__,15,15);})(cells)),cellscontainer);draw(lifespan,(delta,fps) => { return  trottle(delta,8,() => { return  (()=>{updatestate();return render();})()});});return play();})()});})()`.trim()
    )
  })

  it('* import and name space', () => {
    expect(
      'var SKETCH' +
        compileModule(`<- ["SKETCH"] [LIBRARY];
    <- ["*"] [SKETCH];
     make scene [100; 100; -> [..[
       background ["crimson"];
       make rectangle [ width [0.5];  height [0.5]; 25; 25];
       update []
    ]]]`)
          .split('var SKETCH')[1]
          .trim()
    ).toBe(
      `var SKETCH,COMMANDS,ANCHOR,PATH,VECTOR,background,requestanimationframe,destroycomposition,makescene,insertintogroup,insertintogroupbypartitions,removefromgroup,removefromscene,groupadditions,groupchildren,width,height,add,clear,ignore,interpret,listen,load,makearcsegment,makearrow,makecircle,makecurve,makeellipse,makegroup,makeimagesequence,makeline,makelineargradient,makepath,makepoints,makepolygon,makeradialgradient,makerectangle,makeroundedrectangle,makesprite,makestar,maketext,maketexture,on,off,pause,play,release,remove,setplaying,trigger,update,nofill,nostroke,draw,setscreensize,setoffsetstart,setfill,setstroke,setdashes,setlinewidth,offsetby,setposition,setpositionx,setpositiony,setscale,setopacity,setrotation,setwidth,setheight,setorigin,closepath,make,getwidth,getheight,getfromgroup,getorigin,getopacity,getdashes,getposition,getrotation,getscale,gettranslation,getbounds;(()=>{SKETCH = LIBRARY[\"SKETCH\"];NAME = SKETCH[\"NAME\"],COMMANDS = SKETCH[\"COMMANDS\"],ANCHOR = SKETCH[\"ANCHOR\"],PATH = SKETCH[\"PATH\"],VECTOR = SKETCH[\"VECTOR\"],background = SKETCH[\"background\"],requestanimationframe = SKETCH[\"requestanimationframe\"],destroycomposition = SKETCH[\"destroycomposition\"],makescene = SKETCH[\"makescene\"],insertintogroup = SKETCH[\"insertintogroup\"],insertintogroupbypartitions = SKETCH[\"insertintogroupbypartitions\"],removefromgroup = SKETCH[\"removefromgroup\"],removefromscene = SKETCH[\"removefromscene\"],groupadditions = SKETCH[\"groupadditions\"],groupchildren = SKETCH[\"groupchildren\"],width = SKETCH[\"width\"],height = SKETCH[\"height\"],add = SKETCH[\"add\"],clear = SKETCH[\"clear\"],ignore = SKETCH[\"ignore\"],interpret = SKETCH[\"interpret\"],listen = SKETCH[\"listen\"],load = SKETCH[\"load\"],makearcsegment = SKETCH[\"makearcsegment\"],makearrow = SKETCH[\"makearrow\"],makecircle = SKETCH[\"makecircle\"],makecurve = SKETCH[\"makecurve\"],makeellipse = SKETCH[\"makeellipse\"],makegroup = SKETCH[\"makegroup\"],makeimagesequence = SKETCH[\"makeimagesequence\"],makeline = SKETCH[\"makeline\"],makelineargradient = SKETCH[\"makelineargradient\"],makepath = SKETCH[\"makepath\"],makepoints = SKETCH[\"makepoints\"],makepolygon = SKETCH[\"makepolygon\"],makeradialgradient = SKETCH[\"makeradialgradient\"],makerectangle = SKETCH[\"makerectangle\"],makeroundedrectangle = SKETCH[\"makeroundedrectangle\"],makesprite = SKETCH[\"makesprite\"],makestar = SKETCH[\"makestar\"],maketext = SKETCH[\"maketext\"],maketexture = SKETCH[\"maketexture\"],on = SKETCH[\"on\"],off = SKETCH[\"off\"],pause = SKETCH[\"pause\"],play = SKETCH[\"play\"],release = SKETCH[\"release\"],remove = SKETCH[\"remove\"],setplaying = SKETCH[\"setplaying\"],trigger = SKETCH[\"trigger\"],update = SKETCH[\"update\"],nofill = SKETCH[\"nofill\"],nostroke = SKETCH[\"nostroke\"],draw = SKETCH[\"draw\"],setscreensize = SKETCH[\"setscreensize\"],setoffsetstart = SKETCH[\"setoffsetstart\"],setfill = SKETCH[\"setfill\"],setstroke = SKETCH[\"setstroke\"],setdashes = SKETCH[\"setdashes\"],setlinewidth = SKETCH[\"setlinewidth\"],offsetby = SKETCH[\"offsetby\"],setposition = SKETCH[\"setposition\"],setpositionx = SKETCH[\"setpositionx\"],setpositiony = SKETCH[\"setpositiony\"],setscale = SKETCH[\"setscale\"],setopacity = SKETCH[\"setopacity\"],setrotation = SKETCH[\"setrotation\"],setwidth = SKETCH[\"setwidth\"],setheight = SKETCH[\"setheight\"],setorigin = SKETCH[\"setorigin\"],closepath = SKETCH[\"closepath\"],make = SKETCH[\"make\"],getwidth = SKETCH[\"getwidth\"],getheight = SKETCH[\"getheight\"],getfromgroup = SKETCH[\"getfromgroup\"],getorigin = SKETCH[\"getorigin\"],getopacity = SKETCH[\"getopacity\"],getdashes = SKETCH[\"getdashes\"],getposition = SKETCH[\"getposition\"],getrotation = SKETCH[\"getrotation\"],getscale = SKETCH[\"getscale\"],gettranslation = SKETCH[\"gettranslation\"],getbounds = SKETCH[\"getbounds\"];return makescene(100,100,() => { return  (()=>{background(\"crimson\");makerectangle(width(0.5),height(0.5),25,25);return update();})()});})()`
    )
  })
})
