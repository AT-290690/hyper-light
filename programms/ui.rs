;; write a user interface
;; make button
;; click events
<- ["DOM"] [LIBRARY];
<- ["make user interface"; "make container"; "make button"; "insert into container"; "make label"; "on click"; "make span"; "make style"] [DOM];
make user interface [];
|> [
  := [main; make container []];
  | insert into container [
    |> [make button [];
      | make label ["click me"];
      | on click [-> [insert into container [main; 
      |> [
        make span ["I am a span!"];
        | make style ["color: white"]
      ]]]]]]];

