<- ["SKETCH"; "MATH"; "CONSOLE"] [LIB];
<- ["makescene"; "setlinewidth"; "set rotation"; "set position"; "nofill"; "setfill"; "setstroke";  "update"; "background"; "makerectangle"; "width"; "height"] [SKETCH];

make scene [300; 300; -> [..[
  background["black"];
  |> [
    make rectangle [width[0.5]; height[0.5]; width [1]; height [1]];
    | no fill [];
    | setlinewidth [10];
    | set stroke ["purple"]];
  |> [
    make rectangle [width[0.5]; height[0.5]; width [0.5]; height [0.5]];
    | no fill [];
    | setlinewidth [10];
    | set stroke ["lime"]];
  |> [
    make rectangle [1; 1; 25; 25];
    | set position [width [0.5]; height [0.5]];
    | set fill ["crimson"];
    | set rotation [1.2]];
  update []]]]
