<img width="100" alt="Screenshot 2022-10-02 at 22 06 54" src="[https://user-images.githubusercontent.com/88512646/193471696-c2594bf6-085a-4b21-921f-06bb4f5fa0fe.png](https://user-images.githubusercontent.com/88512646/196051171-dd4aea30-a241-45c1-890e-be1a3fd3ead2.sv)">
# hyper-light

A programming language that can be stored in a hyper-link and then shared without the need of a server

```lisp
;; Compiles to JavaScript [Runs on the Web]
;; Safe [Only a small subset of JavaScript is used]
;; Compact [Small in size - can be stored in a link ~1400 characters for Game of Life implementation]
;; Expressive [The whole program is one expression]
;; Functional [Rich set of utility functions]
;; Tree Shakeable [The compiled code uses only the functions that are imported]
;; Composable [The pipe operator |> [5; | add [3]; | mult [4]]; makes it easy to compose functions]

;; Void [Only one empty primitive [void] - this is undefined; no null or NaN]
;; Binar [Shipped with a fast and memory cheap array data-structure binary array O[1] operations]
;; Web Editor [Create web apps directly on the web with autocomplete; logger; live preview on the side]
```

<img width="336" alt="Screenshot 2022-10-02 at 22 06 54" src="https://user-images.githubusercontent.com/88512646/193471696-c2594bf6-085a-4b21-921f-06bb4f5fa0fe.png">

Here is the source for the tree above

```go
<- ["MATH"; "SKETCH"] [LIB];
<- ["makescene"; "makeline"; "update"; "width"; "height"] [SKETCH];
<- ["sin"; "cos"; "PI"] [MATH];

make scene [:= [WIDTH; 500]; := [HEIGHT; 500]; -> [..[
  := [theta; 0.8];
  := [step; 0.7];
  := [angle; * [PI; 0.5]];
  := [length; height [0.25]];
  := [level; 0];
  := [max level; 10];
  := [x; width [0.5]];
  := [y; height [1]];

  ;; ARRAY FOR STACK OF TREE POSITIONS
  := [x stack; .: [max level]];
  := [y stack; .: [max level]];

  := [draw branch; -> [dir; .. [

  ;; CALCULATE NEXT POINT
  := [delta x; * [length; cos [angle]]];
  := [delta y; * [length; sin [angle]]];
  := [next x; + [x; delta x]];
  := [next y; - [y; delta y]];

  ;; DRAW A SINGLE BRANCH!
  make line [x; y; next x; next y];
  .= [x stack; level; x];
  .= [y stack; level; y];
  = [x; next x];
  = [y; next y];
  = [level; + [level; 1]];
  = [angle; + [angle; * [theta; dir]]];
  = [length; * [length; step]];

  ;; EXIT CONDITION OF RECURSION
  ? [< [level; max level]; .. [
    draw branch [1];
    draw branch [-1]]];

  = [angle; - [angle; * [theta; dir]]];
  = [length; : [length; step]];
  = [level; - [level; 1]];
  = [x; . [x stack; level]];
  = [y; . [y stack; level]]]]];

  draw branch [0];
  update []]]]

```

here is the link
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFzIjsiM3oiXVtMSUJdO8QTNVgiOyI1QiI7IjRMxB1vIjsiMsQPM3MiXVszesYmMMQXMG4iOyJQSSJdWzFzXTs1Qls6PVtXSURUSDs1MDBdOzo9W0hFSUdIVMYPLT5bLi5bYmFja2cyc1siIzAxMCLFJXRoZXRhOzAuOMUOc3RlcDswLjfFDWFuZ2xlOypbUEk7MC41JzLEFGxlbmd0aDszc1swLjLJFHZlbDvGdG1heMYPMcYQeDsyQlvJPnnEOTHGDHhzdGFjazsuOsk0xyTXGGRyYXdicmFuY2jkAM1kaXI7Li7kAPRkZWx0YXg7KugAmzBu5gC5JzPFNsQeecseb8webmV4dHg7K1t4O8ZGxmrEFnk7LVt5xhZ5JzI7NExbeDt5O8YwxSBdOy7pAMTmAPJ4xRPnAL/GE3ldO+QBA8U3xAvGQsUWxiErxwjkARToAXErxwgq5wGcZGlyJzPFMuUAwukAy+QBrCcyOz9bPMdF6AEwXeQBGuoBL1sxXTvLDi0xxU7GZC3ebDrPbOgAty3tALd4Oy7tAQrFFXk7Lu0BDCc17ACFMF07M29bJzQ=
