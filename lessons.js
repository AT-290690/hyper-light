export default [
  {
    value: `;; 1 Write a function last returns the last element of a list
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; .. []]];`,
    title: 'Last element of a list',
    solution: `;; solution
:= [last; -> [list; 
            ? [== [. [list; "=>"; 0]; void]; 
                              . [list; "*"]; 
                last [. [list; "=>"; 0]]]]];

last [list];`,
  },

  {
    value: `;; 2 Last two elements of a list
;; Find the last but one (last and penultimate) elements of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; .. []]];`,
    title: 'Last two elements of a list',
    solution: `;; solution
:= [last 2; -> [list; ? [== [. [list; "=>"; 0; "=>"; 0]; void]; 
                                                      list;
                             last 2 [. [list; "=>"; 0]]]]];

last 2 [list];`,
  },

  {
    value: `;; 3 N'th element of a list
;; Find the N'th element of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; n; .. []]];`,
    title: `N'th element of a list`,
    solution: `;; solution
:= [nth element; -> [list; n; 
                  ? [|| [== [n; 0]; 
                         == [. [list; "=>"; 0]; void]]; 
                                         . [list; "*"]; 
          nth element [. [list; "=>"; 0]; - [n; 1]]]]];

nth element [list; 2];`,
  },

  {
    value: `;; 4 Length of a list
;; Find the number of elements of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; length; .. []]];`,
    title: `Length of a list`,
    solution: `;; solution
:= [length of list; -> [list; length; 
                          ? [== [. [list; "=>"; 0]; void];
                                                   length; 
     length of list [. [list; "=>"; 0]; + [length; 1]]]]];

length of list [list; 0];`,
  },

  {
    value: `;; 5 Reverse a list
;; Hyper List standard library has <- ["reverse"] [LIST] but we ask that you reimplement it.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [reverse; -> [list; .. []]];`,
    title: `Reverse a list`,
    solution: `;; solution
:= [reverse; -> [head; 
;; base case
? [|| [== [head; void]; 
      == [. [head; "=>"; 0]; void]]; head; .. [
    ;; reverse 
    := [reversed; reverse [. [head; "=>"; 0]]];
             .= [head; "=>"; 0; "=>"; 0; head];
                    .= [head; "=>"; .: [void]];
                                  reversed]]]];
reverse [list]`,
  },

  {
    value: `;; 6 Palindrome
;; Find out whether a list is a palindrome.
;; HINT: a palindrome is its own reverse.
:= [list; => ["x"; => ["a"; => ["m"; => ["a"; => ["x"]]]]]];
;; := [is palindrome; -> [list; .. []]];`,
    title: `Palindrome`,
    solution: `;; solution
;; our reverse function from before
:= [reverse; -> [head; 
            ;; base case
            ? [|| [== [head; void]; 
                   == [. [head; "=>"; 0]; void]]; head; .. [
                  ;; reverse 
                  := [reversed; reverse [. [head; "=>"; 0]]];
                           .= [head; "=>"; 0; "=>"; 0; head];
                                  .= [head; "=>"; .: [void]];
                                                reversed]]]];

;; simple function that tells us if the given nodes have same value
:= [is same; -> [a; b; == [. [a; "*"]; . [b; "*"]]]];

;; the main function 
:= [is palindrome; -> [list; .. [
  := [reversed;  
      |> [list; 
          | . ["=>"; 0]; ;; honestly no idea why 
          | ... []; ;; copy the list before reversing it
          | reverse []; ;; reverse the list
          ]];
  ~= [iterate; -> [a; b; .. [
  ? [! [is same [a; b]]; 0; 
      ? [== [. [a; "=>"; 0]; void];
                                 1; 
           iterate [. [a; "=>"; 0]; 
               . [b; "=>"; 0]]]]]]]
                [list; reversed]]]];

is palindrome [list]`,
  },

  {
    value: `;; 7 Flatten an array
:= [array; .: ["a";
                .: ["b"; "c"]; 
                .: ["d"; "e"; 
                    .: ["f"; "g"];
                    .: ["h"; "i"; "j"; 
                        .: ["k"; "l"; "m"]]]; 
                .: ["n"]; 
               "o"]];

;; Hint - you can get the constructor name with 
;; . ["a"; "constructor"; "name"] -> "String"`,
    title: `Flatten an array`,
    solution: `;; solution
:= [is array; -> [entity; == ["Array"; . [entity; "constructor"; "name"]]]];
:= [flat; .: []];
:= [flatten; -> [array; >> [array; -> [x; i; a; ? [is array [x]; 
                                                    flatten [x]; 
                          .= [flat; . [flat; "length"]; x]]]]]];
flatten [array]; flat;`,
  },
  {
    value: `;; 8 Remove duplicates from array
:= [array; .: ["a"; "b"; "b"; "c"; "d"; "e"; "e"; "f"; "g"; "h"; "i"; "a"; "b";
               "j"; "k"; "l"; "m"; "n"; "o"; "a"; "b"; "b"; "c"; "d"; "e"; "e";
               "f"; "g"; "h"; "i"; "a"; "b"; "j"; "k"; "l"; "m"; "n"; "o"; "c"]];`,
    title: 'Remove duplicates from array',
    solution: `;; solution
:= [map; :: []];
:= [set; .: []];
>> [array; -> [x; i; a; 
                  ? [== [. [map; x]; void]; 
                    .= [map; x; 
                    .= [set; . [set; "length"]; x]]]]]; 
set;`,
  },
]
