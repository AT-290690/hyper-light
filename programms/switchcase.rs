<- ["CONSOLE"] [UNIVERSE];
<- ["consolelog"] [CONSOLE];

:= [matcher; "meaning of life"];
:= [switch case; 
  ?? [
  . [:: [
    "knock knock"; -> [..["who's there"]]; 
    "meaning of life"; -> [..[42]];
    ;; add more cases here
    ;; ...
  ]; matcher]; 
    ;; default case
  -> ["nothing matched"]
][]];

console log [switch case];