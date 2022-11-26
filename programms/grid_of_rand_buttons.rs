<- ["DOM"; "STYLE"; "EVENT"; "MATH"; "LOOP"] [LIBRARY];
<- ["makecontainer"; "setstyle"; "makelabel"; "makebutton"; "insertintocontainer"; "settextcontent"] [DOM]; 
<- ["unitspixel"; "margin"; "padding"; "cursorpointer"; "border"; "textcolor"; "backgroundcolor"; "display"] [STYLE];
 <- ["onmouseclick"] [EVENT]; 
 <- ["random"; "floor"] [MATH];

:= [rdm; -> [n; floor[* [random []; n]]]];
:= [space; -> [px; 
   ::  ["top"; units pixel [px]; 
       "left"; units pixel [px]; 
      "right"; units pixel [px];
     "bottom"; units pixel [px]]]];

~= [loop; -> [count; callback; .. [callback [];
? [> [count; 0]; loop [= [count; - [count; 1]]; callback]]]]];

:= [make rand button; -> [
make container [|> [
  := [button; make button []];
  make label [rdm [5]];
  set style [
    cursor pointer []; 
    padding [space [10]];
    margin [space [5]];
    border [:: ["size"; units pixel [1]; "type"; "solid"; "color"; "white"]];
    text color ["white"];
    background color["transparent"]];
on mouse click [-> [set text content [button; rdm [5]]]]]]]];

:= [group; -> [.. [
  := [container; |> [make container []; set style [display ["f"]]]];
  loop [10; -> [insert into container [container; make rand button[]]]];
  container]]];

loop [5; group];