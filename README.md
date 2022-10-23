# Hyper Light

<p align="center">
<img  width="100" alt="Star Light Logo" src="https://user-images.githubusercontent.com/88512646/196250251-23ac72d1-e355-4d00-a714-7af7ac769586.svg" />
</p>

Write programms that can be stored in a hyper-link and then shared without a server host

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
;; Tail Call Recursion [Recursive functions can be optimised - just as fast as loops]
;; Devision by zero is a run-time error, as well as number operations are validated
;; Web Editor [Create web apps directly on the web with autocomplete; logger; live preview on the side]
```

<p align="center">
<img width="336" alt="Screenshot 2022-10-02 at 22 06 54" src="https://user-images.githubusercontent.com/88512646/193471696-c2594bf6-085a-4b21-921f-06bb4f5fa0fe.png" />
</p>
Here is the source for the tree above

```go
<- ["MATH"; "SKETCH"] [LIBRARY];
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

here is the link:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFBIjsiM1AiXVs0SF07xBI1VSI7IjVkxBdFIjsiMlDECkkiXVszUMYhMHAiOyIwbyI7IlDEFzFBXTs1VVs6PVtqMDs1MDBdOzo9W3DHCy0+Wy4uxBxpMDswLjjFHGTECzfFC2gwOypbUEk7MC41XcURM2E7M0lbMC4yxxBnMDvGUXEwOzHGCmIwOzJQW8kyYTDEMjHGDW4wOy46W3Ewxg5tzQ5yMOQAjmMwO+YAkWzEezNhOzBvW2gwJzPEImvIE3DJE2YwOyvEcmzHRWUwOy3Ec2vEEDVkxBthMDtmMDtlMF07LuUAgWcwO2LGDW3FDWEwXTvlALZmxQlhxizlANsrxAXkALvlAQorxAUq5AEqY8R+5QEN5QCQZMRtP1s8xC5xxFsuW3IwWzFdO3IwWy0xxSto5ACY0j86yT/FcC3KcGIwOy7mAK7FD2HED+UAsCc1xFcwXTszRVsnNA==

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNQIjsiMnMiOyIxbSJdWzRIXTvEFzVVIjsiNcQcM0TEClEiOyI2xCYyxRRJIjsiNFrENUUiOyI3dMQKRsQUQ8QobsQFTSJdWzNQxk4zaiJdWzFtxg0wxDgwSiJdWzJzXTs1VVszMDA7xAQtPlsuLls6PVtiMDsuOltdXTs6PVtnywxmyAwzalsxNsQwYTA7MFrEMHw+Wzd0WzJQWzAuNV07M0nGCCtbMTA7KsQmMTBdzg8nMzt8Nk1bxQ7ELF07fDZuWypbMC4wMjthxC58NENbImNyaW1zb24ixA9aWyc10Htn33vfe8t7LVsxO8V/MTthxSM1UFsiZGFya3JlZMR/M0TIf+UBKsZ/Zt9/33/Lf8V7M+sA+mJsYWNr6gD4MUVbNsV5ZTA7ZD
