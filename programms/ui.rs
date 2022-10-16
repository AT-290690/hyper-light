;; write a user interface
;; make button
;; click events
<- ["DOM"; "COLOR"] [UNIVERSE];
<- ["makeuserinterface"; "makecontainer"; "makebutton"; "insertintocontainer"; 
"makelabel"; "onmouseclick"; "makespan"; "makestyle"; "makeparagraph"] [DOM];
<- ["randomlightcolor"] [COLOR];
make user interface [];
|> [
  := [main; make container []];
  | insert into container [
    |> [make button [];
      | make label ["click me"];
      | on mouse click [-> [
      insert into container [main; 
      |> [make span ["I am a span!"];
        | make style [+ ["color: "; random light color []]]]; 
      make paragraph []]]]];
      make paragraph []]];

