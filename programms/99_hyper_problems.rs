;; 1 Write a function last returns the last element of a list
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; .. []]];
 
;; solution
:= [last; -> [list; ? [== [. [list; "=>"; 0]; void]; . [list; "*"]; last [. [list; "=>"; 0]]]]];
last [list];

;; --------------------------------------------

;; 2 Last two elements of a list
;; Find the last but one (last and penultimate) elements of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; .. []]];

;; solution
:= [last 2; -> [list; ? [== [. [list; "=>"; 0; "=>"; 0]; void];  list; last 2 [. [list; "=>"; 0]]]]];
last 2 [list];

;; --------------------------------------------

;; 3 N'th element of a list
;; Find the N'th element of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; n; .. []]];

;; solution
:= [nth element; -> [list; n; ? [|| [== [n; 0]; == [. [list; "=>"; 0]; void]]; . [list; "*"]; nth element [. [list; "=>"; 0]; - [n; 1]]]]];
nth element [list; 2];

;; --------------------------------------------

;; 4 Length of a list
;; Find the number of elements of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; length; .. []]];

;; solution
:= [length of list; -> [list; length; ? [== [. [list; "=>"; 0]; void]; length; length of list [. [list; "=>"; 0]; + [length; 1]]]]];
length of list [list; 0];

;; --------------------------------------------

;; 5 Reverse a list
;; Hyper List standard library has <- ["reverse"] [LIST] but we ask that you reimplement it.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [reverse; -> [list; .. []]];

;; solution
:= [reverse; -> [head; 
   ;; base case
   ? [|| [== [head; void]; == [. [head; "=>"; 0]; void]]; head; .. [
     ;; reverse 
     := [reversed; reverse [. [head; "=>"; 0]]];
     .= [head; "=>"; 0; "=>"; 0; head];
     .= [head; "=>"; .: [void]];
     reversed]]]];

reverse [list]

;; --------------------------------------------

;; 6 Palindrome
;; Find out whether a list is a palindrome.
;; HINT: a palindrome is its own reverse.
:= [list; => ["x"; => ["a"; => ["m"; => ["a"; => ["x"]]]]]];
;; := [is palindrome; -> [list; .. []]];

;; solution
;; our reverse function from before
:= [reverse; -> [head; 
   ;; base case
   ? [|| [== [head; void]; == [. [head; "=>"; 0]; void]]; head; .. [
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
         ? [== [. [a; "=>"; 0]; void]; 1; iterate [. [a; "=>"; 0]; . [b; "=>"; 0]]]]]]]
      [list; reversed]]]];

is palindrome [list]
