<- ["MATH"; "SKETCH"; "ARRAY"] [LIBRARY];
<- ["for of"; "range"; "map1"] [ARRAY];
<- ["lerp"; "floor"] [MATH];
<- ["make scene"; "make group"; "insert into group"; 
    "set position x"; "make circle"; "update"] [SKETCH];

:= [a; 3];
:= [b; 23];
:= [N; 10];

:= [points; |> [range [0; N]; | map 1 [-> [x; lerp [a; b; x]]]]];

make scene [500; 100; -> [.. [
  := [group; |> [make group []; | set position x [10]]];
  for of [points; -> [point; 
  insert into group [group; make circle [point; 25; 8]]]];
  update []]]]
