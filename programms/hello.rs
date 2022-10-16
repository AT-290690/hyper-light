<- ["DOM"; "EVENT"] [UNIVERSE];
<- ["*"] [DOM];
<- ["onmouseclick"] [EVENT];

make user interface [];
|> [:= [container; make container []];
  | insert into container [
    |> [make button []; 
      | make label ["say hello"];
      | set style ["
                   border: solid 1px; white;
                   background: transparent;
                   color: white;
                   cursor: pointer;
                   padding: 10px;
                   font-family: Courier New;
                   "];
      | on mouse click [-> [insert into container [container;
          |> [make paragraph ["Hello!"]; 
             | set style ["
                          color: white;
                          font-family: Courier New;
                          "]]]]]]]]