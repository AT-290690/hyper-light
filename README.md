# Hyper Light

<p align="center">
<img  width="100" alt="Star Light Logo" src="https://user-images.githubusercontent.com/88512646/196051171-dd4aea30-a241-45c1-890e-be1a3fd3ead2.svg" />
</p>

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

<p align="center">
<img width="336" alt="Screenshot 2022-10-02 at 22 06 54" src="https://user-images.githubusercontent.com/88512646/193471696-c2594bf6-085a-4b21-921f-06bb4f5fa0fe.png" />
</p>
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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjF2IjsiM0oiXVtMSUJdO8QTNU0iOyI0VsQYeSI7IjJKxApDIl1bM0rGITBvIjsiMG4iOyJQSSJdWzF2XTs1TVs6PVtXSURUSDs1MDBdOzo9W0hFSUdIVMYPLT5bLi7EI3RoZXRhOzAuOMUjc3RlcDswLjfFDWFuZ2xlOypbUEk7MC41JzLEFGxlbmd0aDszQ1swLjLJFHZlbDvGZG1heMYPMcYQeDsySlvJPnnEOTHGDHhzdGFjazsuOsk0xyTXGGRyYXdicmFuY2jkAL1kaXI75gDBZGVsdGF4OyroAJswbuYAuSczxTbEHnnLHm/MHm5leHR4OytbeDvGRsZqxBZ5Oy1becYWeScyOzRWW3g7eTvGMMUgXTsu6QDE5gDyeMUT5wC/xhN5XTvkAQPFN8QLxkLFFsYhK8cI5AEU6AFxK8cIKucBnGRpciczxTLlAMLpAMvkAawnMjs/WzzHRegBMF3kARrqAS9bMV07yw4tMcVOxmQt3mw6z2zoALct7QC3eDsu7QEKxRV5Oy7tAQwnNewAhTBdOzN5Wyc0
