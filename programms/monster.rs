<- ["SKETCH"; "MATH"] [UNIVERSE];
<- ["makescene"; "width"; "height"; "setrotation"; "setposition";
    "setfill"; "nofill"; "setstroke"; "setlinewidth"; "nofill"; "closepath";
    "update"; "makerectangle"; "background"; "setscale"; "PATH";
   "makecircle";
   ] [SKETCH];
<- ["PI"; "randomint"] [MATH];
<- ["makepath"; "pathfrom"] [PATH];

make scene [500; 150; -> [.. [
  background ["#012"];
|> [make rectangle [width [0.5]; height [0.5]; width [1]; height [1]];
    | no fill [];
    | set stroke ["lime"];
    | set line width [5]];
  
:= [points; .: []];
~= [loop; -> [count;  .. [.= [points; count; randomint [0; 90]]; 
          ? [> [count; 0]; loop [= [count; - [count; 1]]]]]]];
loop[452];
  
|> [path from [points]; 
    | set stroke ["crimson"]; 
    | no fill [];
    | set line width [10];
    | close path [];
    | set position [width [0.5]; height [0.5]]
   ]; 

|> [make circle [width [0.54]; height [0.5]; 10]];
|> [make circle [width [0.54]; height [0.5]; 7]; | set fill ["black"]];
|> [make circle [width [0.46]; height [0.5]; 10]];
|> [make circle [width [0.46]; height [0.5]; 7]; | set fill ["black"]];
  |> [make path [0; 50; 50; 50; 50; 20; 20; 30; 40; 30]; 
    | set stroke ["black"]; 
    | set fill ["black"];
    | set line width [5];
    | set scale [0.30];
    | close path [];
    | set position [width [0.5]; height [0.52]]
   ]; 
  
  update []]]]