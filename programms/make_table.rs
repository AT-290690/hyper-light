<- ["DOM"; "STYLE"] [LIBRARY];
<- ["maketablefrom"; "setstyle"; "makecontainer"; "makeuserinterface"] [DOM];
<- ["textcolor"] [STYLE];

make user interface [];
|> [make container [
 |> [
   make table from [
    .: [
      .: ["a1"; "b1"; "c1"; "d1"]; 
      .: ["a2"; "b2"; "c2"; "d2"];
      .: ["a3"; "b3"; "c3"; "d3"];
      .: ["a4"; "b4"; "c4"; "d4"];
    ]];
  set style [text color ["white"]]]]];