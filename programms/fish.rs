<- ["SKETCH"; "ARRAY"; "MATH"; "COLOR"; "LOOP"] [LIBRARY];

<- ["make scene"; "make circle"; "make group"; "background"; 
    "width"; "height"; "update"; "no stroke"; 
    "draw"; "make rectangle"; "play"; "make polygon"; "VECTOR";
   "set position"; "set fill"; "set opacity"; "set origin"; "set rotation";
   "get translation"] [SKETCH];

<- ["repeat"] [LOOP; "cycle"];
<- ["push"] [ARRAY; "array"];
<- ["PI"; "sin"; "cos"] [MATH];

make scene [400; 200; -> [.. [
background ["#0f2645"];
:= [w; 4];
:= [h; 4];
:= [size; 8];
:= [mid; - [width [0.5]; * [size; 0.5]]];
:= [colors; .: ["#9dc5eb"; "#6888a6"]];
:= [rects; .: []];
cycle repeat [w; -> [x; 
  cycle repeat [h; -> [y; 
    |> [rects; 
      | array push [
        |> [make circle [
          * [x; size]; * [y; size]; * [size; 0.65]; * [size; 0.25]]; 
          | set fill [. [colors; % [+ [x; y]; 2]]]; 
          | no stroke []]]]]]]];
:= [h; height [0.5]];
:= [fin 1; 
    |> [make polygon [0; 0; 18; 3]; 
        | set rotation [* [PI; 0.3]]; 
        | set position [+ [mid; 28]; + [h; -26]]; 
        | set fill [. [colors; 1]]]];  
:= [fin 2; 
    |> [make polygon [0; 0; 15; 3]; 
        | set rotation [* [PI; -0.5]]; 
        | set position [+ [mid; 5]; + [h; 35]];
        | set fill [. [colors; 1]]]];  
:= [tail; 
    |> [make polygon [0; 0; 23; 3]; 
        | set rotation [* [PI; 0.9]];
        | set position [+ [mid; 50]; +[h; 15]];
        | set fill [. [colors; 1]]]];  
:= [body; 
    |> [make polygon [0; 0; 40; 4];
        | set rotation [* [PI; 0.85]];
        | set position [+ [mid; 5]; h];
        | set fill [. [colors; 0]]]]; 
:= [scales; 
    |> [rects;
        | make group [];
        | set rotation [* [PI; 0.8]];
        | set position [+[mid;5]; h];
        | set origin [* [size; 2]; * [size; 2]]]];
:= [eyeball; 
    |> [make circle [0; 0; 8];
        | set position [+ [mid; -18]; + [h; -7]];
        | set fill ["white"]]]; 
:= [iris; 
    |> [make circle [0; 0; 6];
        | set position [+ [mid; -18]; + [h; -7]];
        | set fill ["black"]]];
  
:= [fish; make group [.: [fin1; fin2; tail; body; scales; eyeball; iris]]];
|> [fish; 
    | set position [mid; height [0.3]];
    | set origin [+ [mid; 20]; + [h; -20]];
    | set rotation [-0.2]];

draw [60; -> [frame count; _; .. [
.= [fish; "rotation"; + [-0.25; * [-0.2; sin [* [frame count; 0.1]]]]]; 
.= [tail; "rotation"; + [3; * [0.2; sin [* [frame count; 0.15]]]]]; 
:= [amplitude; 2]; 
.= [fish; "position"; "x"; 
    + [. [fish; "position"; "x"]; * [2; cos [* [frame count; 0.05]]]]]; 
.= [fish; "position"; "y";
    + [. [fish; "position"; "y"]; * [amplitude; sin [* [frame count; 0.1]]]]]; 
]]]; 
play []]]];

