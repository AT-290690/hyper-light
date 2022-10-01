<- ["BINAR"; "ARRAY"; "LOGIC"] [LIBRARY]; 
<- ["from"; "to"; "balance"; "append"; "prepend"; "tail"; "first"; "is empty"] [BINAR]; 

:= [isvalidparens; -> [input; 
|> [input; 
  | from [];  
  | to [-> [acc; x; index; arr;
    ? [== ["("; x]; prepend [acc; x]; 
        ? [== [first [acc]; "("]; tail [acc]; 
          append [acc; x]]]]]; 
  | isempty []]]];

  is valid parens ["(())"];