<- ["BINAR"; "ARRAY"] [UNIVERSE];
<- ["ones"; "zeroes"; "map"; "toarray"] [BINAR];
:= [bin map; map];
<- ["map"] [ARRAY];
|>[
  |> [10; 
      | ones []; 
      | bin map [-> [x; i; a; * [x; 254]]];
      | to array []];
| map [-> [x; i; a; + [x; 110]]]]