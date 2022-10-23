;; 1 Write a function last returns the last element of a list
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; .. []]];
 
;; solution
:= [last; -> [list; ? [== [. [list; "=>"; 0]; void]; . [list; "*"]; last [. [list; "=>"; 0]]]]];
:= [log; LOGGER [0]];
log [last [list]];

;; --------------------------------------------

;; 2 Last two elements of a list
;; Find the last but one (last and penultimate) elements of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; .. []]];

;; solution
:= [last 2; -> [list; ? [== [. [list; "=>"; 0; "=>"; 0]; void]; . [list; "*"]; last 2 [. [list; "=>"; 0]]]]];
:= [log; LOGGER [0]];
log [last 2 [list]];

;; --------------------------------------------

;; 3 N'th element of a list
;; Find the N'th element of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; n; .. []]];

;; solution
:= [nth element; -> [list; n; ? [|| [== [n; 0]; == [. [list; "=>"; 0]; void]]; . [list; "*"]; nth element [. [list; "=>"; 0]; - [n; 1]]]]];
:= [log; LOGGER [0]];
log [nth element [list; 2]];

;; --------------------------------------------

;; 4 Length of a list
;; Find the number of elements of a list.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; length; .. []]];

;; solution
:= [length of list; -> [list; length; ? [== [. [list; "=>"; 0]; void]; length; length of list [. [list; "=>"; 0]; + [length; 1]]]]];
:= [log; LOGGER [0]];
log [length of list [list; 0]];

;; --------------------------------------------

;; 5 Reverse a list
;; Hyper List standard library has <- ["reverse"] [LIST] but we ask that you reimplement it.
:= [list; => [0; => [1; => [2; => [3; => [4]]]]]];
;; := [last; -> [list; temp; .. []]];

