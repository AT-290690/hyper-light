<- ["ARRAY"; "MATH"] [LIBRARY];
<- ["range"] [ARRAY];
<- ["random"; "floor"] [MATH];

;; Randomize array in-place using Durstenfeld shuffle algorithm 
:= [shuffle array; -> [array; .. [
  ~= [loop; -> [i; .. [
    := [j; floor [* [random []; + [i; 1]]]];
    := [temp; . [array; i]];
    .= [array; i; . [array; j]];
    .= [array; j; temp];
  ? [> [i; 0]; loop [= [i; - [i; 1]]]; array]]]]
  [- [. [array; "length"]; 1]]]]];

shuffle array [range [1; 100]]