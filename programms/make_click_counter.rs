<- ["STYLE"; "DOM"; "EVENT"] [LIBRARY];
<- ["*"] [DOM]; <- ["*"] [STYLE]; <- ["*"] [EVENT];

:= [make counter; -> [label; ..[
  := [count; 0];
  make container [
      := [par;|> [make paragraph [count]; 
      set style [text color ["white"]]]];
                      |> [make button []; 
                      make label [label];
           set style [cursor pointer []];
           on mouse click [-> [.. [
                  = [count; + [count; 1]]; 
    set text content [par; count]]]]]]]]];

make container [
  make counter ["counter 1"]; 
  make counter ["counter 2"]; 
  make counter ["counter 3"]];