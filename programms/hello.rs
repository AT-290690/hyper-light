<- ["DOM"; "EVENT"; "COLOR"] [UNIVERSE];
<- ["*"] [DOM];
<- ["onmouseclick"] [EVENT];
<- ["randomcolor"] [COLOR];

make user interface [];
|> [:= [container; make container []];
  | insert into container [
    |> [make button []; 
      | make label ["say hello"];
      | set style ["
                   border: dashed 1px orange;
                   background: transparent;
                   color: cyan;
                   cursor: pointer;
                   padding: 10px;
                   "];
      | on mouse click [-> [insert into container [container;
          |> [make paragraph ["Hello!"]; 
             | set style [+ ["color:"; random color []]]]]]]]]]