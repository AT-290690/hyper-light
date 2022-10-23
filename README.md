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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFtIjsiM3AiXVs0Zl07xBI1dCI7IjRCxBdlIjsiMnfECmkiXVszcMYhMG4iOyIwxDhQSSJdWzFtXTs1dFs6PVtqMDs1MDBdOzo9W3DHCy0+Wy4uxBxpMDswLjjFHGTECzfFC2gwOypbUEk7MC41XcURM2w7M2lbMC4yxxBnMDvGUXEwOzHGCmIwOzJ3W8kyYTDEMjHGDW4wOy46W3Ewxg5tzQ5yMOQAjmMwO+YAkWzEezNsOzBtW2gwJzPEImvIE27JE2YwOyvEcmzHRWUwOy3Ec2vEEDRCxBthMDtmMDtlMF07LuUAgWcwO2LGDW3FDWEwXTvlALZmxQlhxizlANsrxAXkALvlAQorxAUq5AEqY8R+5QEN5QCQZMRtP1s8xC5xxFsuW3IwWzFdO3IwWy0xxSto5ACY0j86yT/FcC3KcGIwOy7mAK7FD2HED+UAsCc1xFcwXTszZVsnNA==

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNwIjsiMmIiOyIwWiJdWzRmXTvEFzV0IjsiNW8iOyIzZMQKxCY1UsQrd8QUaSI7IjR5IjsiMXEiOyI2VcQKcsQUYcQoTcQUbiJdWzNwxk4yTSJdWzBaxg0wTsRtUiJdWzJiXTs1dFszMDA7xAQtPlsuLls6PVtiMDsuOltdXTs6PVtnywxmyAwyTVsxNsQwYTA7ME7EMHw+WzZVWzJ3WzAuNV07M2nGCCtbMTA7KsQmMTBdzg8nMzt8Nm5bxQ7ELF07fDVNWypbMC4wMjthxC58NGFbIjNyIsQKeVsnNdB2Z99233bLdi1bMTvFejE7YcUjNW9bImRhcmtyZWTEfzNkyH/lASXGf2bff99/y3/FezPrAPUxSeoA9TFxWzbFdmUwO2QwOy4uWzBS5AFxLT5bYzA7YTA7Lj3ECSI0ZyI7K1suyAxdxnMwLjAwMSc1OzBS5AEv3zTSNGbfNM80ODsxclsnNDs=

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMUwiOyIyQiJdWzRmXTvEFyoiXVswYsYMNnUiXVsxTMcNcyJdWzJCXTs3cVtdO3w+Wzo9WzRLOzZPW11dO3w3eVt8Pls1d8QbNE5bInNheSBoZWxsbyLEEWpbIiDSAWJvcmRlcjogZGFzaGVkIDFweCAyQzvTKTVSOiB0cmFuc3BhcmVudNQjY29sb3I6IGN5YW7VH3Vyc8QgcG9pbnRlctQjcGFkZGluZzogMTBweNQh5ADKNnVbLT5bN3nkAPp8Pls2UFsiSOQA5iHnAOd+WyLmAIoiOzZzWycxMA==

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNwIjsiMmIiOyIzYyI7IjFtIl1bNGZdO8QcNXQiOyI1xCE2VcQhZcQhcsQFcSI7IjdtxB5SxD93xB5pxChvIjsiNGHEGcQKM2TED3kiXVszcMZTME7EF0UiXVsyYsYSMnTEH2PHcmUiXVsxbV07Oj1bYzA7NTDFCnIwOzAuMjXFDGIwOyrEG3IwXcUQaDsqxBRyMDstMcYScTA7LjpbIjFJxGpyIsYVazA7Y8ZNaskKb8UpxiB1MDstPlt4O3k7LsQYK1t4OyrEK3knNcQfecUfxDEuWzo9W0UwOzVwxDp+PVswWMQbbjA7cMUeP1shWyXED2vkAKHkAKArW2g7YjAnM8RIdDA7NWVbMDvnAKtDzg9oMDt8Pls2VVslWyrEQ2IwXeYA3sVMxEbFE3w0YVsu5ADndMQXfDR5W8ZdZzA7OjpbInN0YXRlIsULYWxpdmUiO3QwOyIwWSI7QzBdOyJyZW5kZXIiO2jEPTdt5ADMaDBdOzBO5ADfZzBdOz9bPltwMDtuxBVYWz3kAIkrxAXkAKVwMCc1xBYwOy1b5QEgazBdxRlF5wDhROgBKXjoASx55AGZOzNFxBUtPuQApWEwO+YBSsQdP1slW2EwO2owXTt5O8QRK1t5OzEnNMRNeDvFHOUA/uYA4HUw5AGkXV07eDDED3g7eSc3xBtB5QHL5ADzeCI7MDsieSI7MV3lAQN4IjsxxRDkAfTGEC3QEcYx5ACnzTLLEccz0SPRIjHmAQd36gJP5QEFMGrEbzJ05ACpLT5bZegBHeYA0+QCbi7EFSJ45AKv5AECxg95Iic0O8U+K8QFP8QwLsQF6AHl5wHiXTswJzY7MGrGfULFZEQw6gFy6gCJdNdB5QFhejA7d+gBYT9bJibELjzEFjJdXTsu5QCuyTjkAlDlAi3GJz7EJzPeJyFbdDBdOz3FaNcrMSc55ACJc+UAuW0wOzFH5AJJ5gNUxQ/mAfvmAh/mAsr/AOz1AOzlA0HEGsZDIl076gNQ7wCWxjTPSTBZIuYCeHYwOzEwMDBdOzV0WzEzMOQEsuUAiOkEJ3zlAw18eTBbXTt8Nm9bMTU7MTUnMzsxccQ85gDlZDA7czDECTjHO0LELuYAm1snNjsxcuQA8Q==
