<- ["BINAR"] [LIB];
<- ["ones"; "zeroes"; "map"; "toarray"] [BINAR];

|> [10; 
   | ones []; 
   | map [-> [x; i; a; * [x; 254]]];
   | to array []]