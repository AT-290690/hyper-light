<- ["SKETCH"; "ARRAY"; "LOOP"] [LIBRARY];
<- ["makescene"; "setstroke"; "nofill";
    "makegroup"; "background"; 
    "width"; "height"; "nostroke"; 
    "draw"; "makerectangle"; "play"; 
    "setfill"; "setopacity"; "setrotation"] [SKETCH];
<- ["repeat"] [LOOP];
<- ["push"; "each"] [ARRAY];

make scene [300; 300; -> [.. [

:= [arr; .: []];
:= [strokes; .: []];
:= [shadows; .: []];

repeat [16; -> [i; push [arr; |> [
  make rectangle [width [0.5]; height [0.5]; + [10; * [i; 10]]; + [10; * [i; 10]]]; 
  | set rotation [* [i; 0.5]]; 
  | set opacity [* [0.02; i]]; 
  | set fill ["crimson"]; 
  | no stroke []]]]];

repeat [16; -> [i; push [strokes; |> [
  make rectangle [width [0.5]; height [0.5]; + [10; * [i; 10]]; + [10; * [i; 10]]]; 
  | set rotation [* [i; 0.5]]; 
  | set opacity [- [1; * [0.01; i]]]; 
  | set stroke ["darkred"]; 
  | no fill []]]]];

repeat [10; -> [i; push [shadows; |> [
  make rectangle [width [0.5]; height [0.5]; + [10; * [i; 10]]; + [10; * [i; 10]]]; 
  | set rotation [* [i; 0.5]]; 
  | set opacity [* [0.03; i]]; 
  | set fill ["black"]; 
  | no stroke []]]]];

draw [60; -> [frame; delta; .. [
  each [arr; 
        -> [leaf; i; .= [leaf;  "rotation"; 
        + [.[leaf; "rotation"]; * [i; 0.001]]]]];
  each [strokes; 
        -> [leaf; i; .= [leaf;  "rotation"; 
        + [.[leaf; "rotation"]; * [i; 0.001]]]]];
  each [shadows; 
        -> [leaf; i; .= [leaf;  "rotation"; 
        + [.[leaf; "rotation"]; * [i; 0.001]]]]]]]];
play []]]];