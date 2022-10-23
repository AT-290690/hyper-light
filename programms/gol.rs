<- ["SKETCH"; "ARRAY"; "OBJECT"; "MATH"] [LIBRARY]; 
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
      | set fill [. [COLORS; is alive]];
      | no stroke []]];
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
  := [cell; get cell [+ [x; . [dir; "x"]]; 
  + [y; . [dir; "y"]]]]; 
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
    | makegrid []; 
    | set position [15; 15]]]; 
  draw [lifespan; -> [delta; fps; trottle [delta; 8; -> [.. [
    update state []; 
    render []]]]]]; 
  play []]]]; 