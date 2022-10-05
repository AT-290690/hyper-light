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
    ).toBe(
      `${UTIL}
var x,y,temp;(()=>{(void(x=10)||x);(void(y=3)||y);(void(temp=x)||temp);(void(x=y)||x);(void(y=temp)||y);return {"x":x,"y":y,}})()`.trim()
    )
  })

  it('game of life', () => {
    expect(
      'var SKETCH' +
        compileModule(
          `<-["SKETCH";"ARRAY";"OBJECT";"MATH"][LIBRARY];<-["make scene";"make group";"make rectangle";"update";"play";"draw";"insert into group";"background";"width";"height";"set position";"set fill";"set stroke";"no fill";"no stroke"][SKETCH];<-["push";"for each"][ARRAY];<-["for of"][OBJECT];<-["dice"][MATH;"roll"];:=[N;50];:=[factor;0.25];:=[r;*[N;factor]];:=[h;*[r;factor;-1]];:=[COLORS;.:["black";"crimson"]];:=[cols;N];:=[rows;N];:=[cells;.:[]];:=[getcell;->[x;y;.[cells;+[x;*[rows;y]]]]];:=[makegrid;->[cells;..[:=[cellscontainer;makegroup[]];~=[loop;->[count;bounds;..[?[![%[count;cols]];=[h;+[h;r]]];:=[isalive;rolldice[0;1]];:=[nextisalive;rolldice[0;1]];:=[rect;|>[makerectangle[%[*[count;r];*[r;cols]];h;r;r];|setfill[.[COLORS;isalive]];|nostroke[]]];:=[cell;::["state";::["alive";isalive;"next";nextisalive];"render";rect]];insertintogroup[cellscontainer;rect];push[cells;cell];?[>[bounds;count];loop[=[count;+[count;1]];bounds]]]]];loop[0;-[*[rows;cols];1]];cellscontainer]]];:=[iteratecells;->[cells;callback;..[:=[y;-1];foreach[cells;->[cell;i;cells;..[=[y;?[%[i;rows];y;=[y;+[y;1]]]];:=[x;%[i;cols]];:=[cell;getcell[x;y]];callback[cell;x;y]]]]]]];:=[directions;.:[::["x";0;"y";1];::["x";1;"y";0];::["x";-1;"y";0];::["x";0;"y";-1];::["x";1;"y";-1];::["x";-1;"y";-1];::["x";1;"y";1];::["x";-1;"y";1]]];:=[adjacent;->[x;y;..[:=[sum;0];forof[directions;->[dir;..[<-["x";"y"][dir;"dir"];:=[cell;getcell[+[x;dirx];+[y;diry]]];=[sum;+[sum;?[cell;.[cell;"state";"alive"];0]]]]]];sum]]];:=[updatestate;->[iteratecells[cells;->[cell;x;y;..[:=[isalive;.[cell;"state";"alive"]];:=[neighbors;adjacent[x;y]];?[&&[isalive;<[neighbors;2]];.=[cell;"state";"next";0];?[&&[isalive;>[neighbors;3]];.=[cell;"state";"next";0];?[&&[![isalive];==[neighbors;3]];.=[cell;"state";"next";1]]]]]]]]];:=[trottle;->[delta;value;callback;?[![%[delta;value]];callback[]]]];:=[render;->[iteratecells[cells;->[cell;x;y;..[:=[isalive;.[cell;"state";"alive"]];setfill[.[cell;"render"];.[COLORS;isalive]];.=[cell;"state";"alive";.[cell;"state";"next"]]]]]]];:=[lifespan;1000];makescene[1300;500;->[..[:=[cellscontainer;|>[cells;|makegrid[];|setposition[15;15]]];draw[lifespan;->[delta;fps;trottle[delta;8;->[..[updatestate[];render[]]]]]];play[]]]];`
        )
          .split('var SKETCH')[1]
          .trim()
    ).toBe(
      `var SKETCH,ARRAY,OBJECT,MATH,makescene,makegroup,makerectangle,update,play,draw,insertintogroup,background,width,height,setposition,setfill,setstroke,nofill,nostroke,push,foreach,forof,rolldice,N,factor,r,h,COLORS,cols,rows,cells,getcell,makegrid,iteratecells,directions,adjacent,updatestate,trottle,render,lifespan;(()=>{SKETCH = LIBRARY["SKETCH"];ARRAY = LIBRARY["ARRAY"];OBJECT = LIBRARY["OBJECT"];MATH = LIBRARY["MATH"];makescene = SKETCH["makescene"];makegroup = SKETCH["makegroup"];makerectangle = SKETCH["makerectangle"];update = SKETCH["update"];play = SKETCH["play"];draw = SKETCH["draw"];insertintogroup = SKETCH["insertintogroup"];background = SKETCH["background"];width = SKETCH["width"];height = SKETCH["height"];setposition = SKETCH["setposition"];setfill = SKETCH["setfill"];setstroke = SKETCH["setstroke"];nofill = SKETCH["nofill"];nostroke = SKETCH["nostroke"];push = ARRAY["push"];foreach = ARRAY["foreach"];forof = OBJECT["forof"];rolldice = MATH["dice"];(void(N=50)||N);(void(factor=0.25)||factor);(void(r=(N*factor))||r);(void(h=(r*factor*-1))||h);(void(COLORS=["black","crimson"])||COLORS);(void(cols=N)||cols);(void(rows=N)||rows);(void(cells=[])||cells);(void(getcell=(x,y) => { return  cells[(x+(rows*y))];})||getcell);(void(makegrid=(cells) => {var cellscontainer,__tail_loop,loop; return  (()=>{(void(cellscontainer=makegroup())||cellscontainer);(void(loop=_tco((void(__tail_loop=(count,bounds) => {var isalive,nextisalive,rect,cell; return  (()=>{(!(count%cols)?(void(h=(h+r))||h):null);(void(isalive=rolldice(0,1))||isalive);(void(nextisalive=rolldice(0,1))||nextisalive);(void(rect=_pipe((__) => { return  setfill(__,COLORS[isalive]);},(__) => { return  nostroke(__);})(makerectangle(((count*r)%(r*cols)),h,r,r)))||rect);(void(cell={"state":{"alive":isalive,"next":nextisalive,},"render":rect,})||cell);insertintogroup(cellscontainer,rect);push(cells,cell);return ((bounds>count)?() => { return  __tail_loop((void(count=(count+1))||count),bounds);}:null);})()})||__tail_loop)))||loop);loop(0,((rows*cols)-1));return cellscontainer})()})||makegrid);(void(iteratecells=(cells,callback) => {var y; return  (()=>{(void(y=-1)||y);return foreach(cells,(cell,i,cells) => {var x,cell; return  (()=>{(void(y=((i%rows)?y:(void(y=(y+1))||y)))||y);(void(x=(i%cols))||x);(void(cell=getcell(x,y))||cell);return callback(cell,x,y);})()});})()})||iteratecells);(void(directions=[{"x":0,"y":1,},{"x":1,"y":0,},{"x":-1,"y":0,},{"x":0,"y":-1,},{"x":1,"y":-1,},{"x":-1,"y":-1,},{"x":1,"y":1,},{"x":-1,"y":1,}])||directions);(void(adjacent=(x,y) => {var sum; return  (()=>{(void(sum=0)||sum);forof(directions,(dir) => {var dirx,diry,cell; return  (()=>{dirx = dir["x"];diry = dir["y"];(void(cell=getcell((x+dirx),(y+diry)))||cell);return (void(sum=(sum+(cell?cell["state"]["alive"]:0)))||sum);})()});return sum})()})||adjacent);(void(updatestate=() => { return  iteratecells(cells,(cell,x,y) => {var isalive,neighbors; return  (()=>{(void(isalive=cell["state"]["alive"])||isalive);(void(neighbors=adjacent(x,y))||neighbors);return (((isalive)&&((neighbors<2)))?(void(cell["state"]["next"]=0)||cell):(((isalive)&&((neighbors>3)))?(void(cell["state"]["next"]=0)||cell):(((!isalive)&&((neighbors===3)))?(void(cell["state"]["next"]=1)||cell):null)));})()});})||updatestate);(void(trottle=(delta,value,callback) => { return  (!(delta%value)?callback():null);})||trottle);(void(render=() => { return  iteratecells(cells,(cell,x,y) => {var isalive; return  (()=>{(void(isalive=cell["state"]["alive"])||isalive);setfill(cell["render"],COLORS[isalive]);return (void(cell["state"]["alive"]=cell["state"]["next"])||cell);})()});})||render);(void(lifespan=1000)||lifespan);return makescene(1300,500,() => {var cellscontainer; return  (()=>{(void(cellscontainer=_pipe((__) => { return  makegrid(__);},(__) => { return  setposition(__,15,15);})(cells))||cellscontainer);draw(lifespan,(delta,fps) => { return  trottle(delta,8,() => { return  (()=>{updatestate();return render();})()});});return play();})()});})()`.trim()
    )
  })
})
