<- ["SKETCH"; "STRING"; "ARRAY"; "OBJECT"] [LIBRARY];
<- ["makescene"; "makerectangle"; "nostroke"; "nofill"; 
    "setfill"; "setstroke"; "setposition"; "update";
    "setscale"; "insertintogroup"; "makegroup"; 
    "setpositionx"; "setpositiony"] [SKETCH];
<- ["split"; "compact"; "map1"] [ARRAY]; 
<- ["trim"] [STRING];
<- ["forin"] [OBJECT];

:= [make abc; -> [font; cols; rows; .. [
  = [font; for in [font; -> [key; obj; 
              .= [obj; key; |> [. [obj; key]; 
               trim [];
               split [" "];
               compact [];
               map 1 [-> [item;  == [item; "*"]]
               ]]]]]];
  -> [glyph; .. [
  := [letter; . [font; glyph]];
  := [group; |> [make group []; 
                set position [20; 50]]];
  := [y; 0];
  ~= [loop; -> [i; bounds; .. [
    := [x; % [i; cols]];
    ? [== [x; 0]; = [y; + [y; 1]]];
    ? [. [letter; i];
         insert into group [group; 
         |> [make rectangle [* [x; 10]; * [y; 10]; 10; 10];
            no stroke []]]];
  ? [> [bounds; i]; loop [= [i; + [i; 1]]; bounds]]]]];
  loop[0; * [rows; cols]]; group]]]]];

:= [make glyph; make abc [:: [
"a"; 
"
    .  *  *  .
    .  .  .  *
    .  *  *  *
    *  .  .  *
    .  *  *  *
"; 
"b"; 
"
    *  .  .  .
    *  .  .  .
    *  *  *  . 
    *  .  .  * 
    *  *  *  .
";
"c"; 
"
    .  *  *  .
    *  .  .  *
    *  .  .  . 
    *  .  .  * 
    .  *  *  .
";
    "d"; 
"
    .  .  .  *
    .  .  .  *
    .  *  *  * 
    *  .  .  * 
    .  *  *  *
";
"e"; 
"
    .  *  *  .
    *  .  .  *
    *  *  *  * 
    *  .  .  . 
    .  *  *  .
";
"f"; 
"
    .  .  * *
    .  *  .  .
    *  *  *  * 
    .  *  .  . 
    .  *  .  .
";
"o"; 
"
    .  *  *  .
    *  .  .  *
    *  .  .  * 
    *  .  .  * 
    .  *  *  .
";
"z"; 
"
    *  *  *  *
    .  .  .  *
    .  *  *  . 
    *  .  .  . 
    *  *  *  *
";
" "; 
"
    .  .  .  .
    .  .  .  .
    .  .  .  . 
    .  .  .  . 
    .  .  .  .
";
  "0"; 
"
    .  *  *  .
    *  *  .  *
    *  .  .  * 
    *  .  *  * 
    .  *  *  .
";
"1"; 
"
    .  *  *  .
    .  .  *  .
    .  .  *  . 
    .  .  *  . 
    .  .  *  .
";
"2"; 
"
    .  *  *  *
    .  .  .  *
    .  .  *  . 
    .  *  .  . 
    .  *  *  *
"
]; 4; 5]];

make scene [500; 500; -> [.. [
  |> [make glyph ["a"]; set position x [10]];
  |> [make glyph ["b"]; set position x [60]];
  |> [make glyph ["c"]; set position x [110]];
  |> [make glyph ["2"]; set position x [160]];
  update [];
]]];
