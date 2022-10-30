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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFtIjsiM3AiXVs0Z107xBI1eCI7IjRExBdlIjsiMnfECmkiXVszcMYhMG4iOyIwxDhQSSJdWzFtXTs1eFs6PVtqMDs1MDBdOzo9W3DHCy0+Wy4uxBxpMDswLjjFHGTECzfFC2gwOypbUEk7MC41XcURM2w7M2lbMC4yxxBnMDvGUXEwOzHGCmIwOzJ3W8kyYTDEMjHGDW4wOy46W3Ewxg5tzQ5yMOQAjmMwO+YAkWzEezNsOzBtW2gwJzPEImvIE27JE2YwOyvEcmzHRWUwOy3Ec2vEEDRExBthMDtmMDtlMF07LuUAgWcwO2LGDW3FDWEwXTvlALZmxQlhxizlANsrxAXkALvlAQorxAUq5AEqY8R+5QEN5QCQZMRtP1s8xC5xxFsuW3IwWzFdO3IwWy0xxSto5ACY0j86yT/FcC3KcGIwOy7mAK7FD2HED+UAsCc1xFcwXTszZVsnNA==

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNwIjsiMmIiOyIwWiJdWzRnXTvEFzV4IjsiNXMiOyIzZMQKdMQFWMQrd8QUaSI7IjRBIjsiMXEiOyI3Y8QKcsQUxEk1UyI7IjZ1Il1bM3DGTjJNIl1bMFrGDTBOxG1SIl1bMmJdOzV4WzMwMDvEBC0+Wy4uWzo9W2IwOy46W11dOzo9W2fLDGbIDDJNWzE2xDBhMDswTsQwfD5bN2NbMndbMC41XTszacYIK1sxMDsqxCYxMF3ODyczO3w2dVvFDsQsXTt8NVNbKlswLjAyO2HELnw0YlsiM3IixApBWyc10HZn33bfdst2LVsxO8V6MTthxSM1c1siZGFya3JlZMR/M2TIf+UBJcZ/Zt9/33/Lf8V7M+sA9TFJ6gD1MXFbNsV2ZTA7ZDA7Li5bMFLkAXEtPltjMDthMDsuPcQJIjRoIjsrWy7IDF3GczAuMDAxJzU7MFLkAS/fNNI0Zt80zzQ4OzFyWyc0Ow==

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMUwiOyIyQiJdWzRnXTvEFyoiXVswYsYMNsQZMUzHDXoiXVsyQl07N3pbXTt8Pls6PVs0TTs2VltdXTt8N0hbfD5bNULEGzRSWyJzYXkgaGVsbG8ixBFsWyIg0gFib3JkZXI6IGRhc2hlZCAxcHggMkM70yk1WDogdHJhbnNwYXJlbnTUI2NvbG9yOiBjeWFu1R91cnPEIHBvaW50ZXLUI3BhZGRpbmc6IDEwcHjUIeQAyjZCWy0+WzdI5AD6fD5bNldbIkjkAOYh5wDnflsi5gCKIjs2elsnMTA=

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNwIjsiMmIiOyIzYyI7IjFtIl1bNGddO8QcNXgiOyI1dCI7IjfEHDNlxCFyxAVxxBR2xB5YxD93xB5pIjsiNsQUNMRONXPEFGTED0EiXVszcMZTME7EF0YiXVsyYsYSMnTEH2PHcmkiXVsxbV07Oj1bYzA7NTDFCnIwOzAuMjXFDGIwOyrEG3IwXcUQaDsqxBRyMDstMcYScTA7LjpbIjFJxGpyIsYVazA7Y8ZNaskKb8UpxiB1MDstPlt4O3k7LsQYK1t4OyrEK3knNcQfecUfxDEuWzo9W0UwOzV0xDp+PVswWMQbbjA7cMUeP1shWyXED2vkAKHkAKArW2g7YjAnM8RIdDA7NWlbMDvnAKtDzg9oMDt8Pls3Y1slWyrEQ2IwXeYA3sVMxEbFE3w0Ylsu5ADndMQXfDRBW8ZdZzA7OjpbInN0YXRlIsULYWxpdmUiO3QwOyIwWSI7QzBdOyJyZW5kZXIiO2jEPTd25ADMaDBdOzBO5ADfZzBdOz9bPltwMDtuxBVYWz3kAIkrxAXkAKVwMCc1xBYwOy1b5QEgazBdxRlF5wDhROgBKXjoASx55AGZOzNGxBUtPuQApWEwO+YBSsQdP1slW2EwO2owXTt5O8QRK1t5OzEnNMRNeDvFHOUA/uYA4HUw5AGkXV07eDDED3g7eSc3xBtB5QHL5ADzeCI7MDsieSI7MV3lAQN4IjsxxRDkAfTGEC3QEcYx5ACnzTLLEccz0SPRIjHmAQd36gJP5QEFMGrEbzJ05ACpLT5bZegBHeYA0+QCbi7EFSJ45AKv5AECxg95Iic0O8U+K8QFP8QwLsQF6AHl5wHiXTswJzY7MGrGfULFZEQw6gFy6gCJdNdB5QFhejA7d+gBYT9bJibELjzEFjJdXTsu5QCuyTjkAlDlAi3GJz7EJzPeJyFbdDBdOz3FaNcrMSc55ACJc+UAuW0wOzFH5AJJ5gNUxQ/mAfvmAh/mAsr/AOz1AOzlA0HEGsZDIl076gNQ7wCWxjTPSTBZIuYCeHYwOzEwMDBdOzV4WzEzMOQEsuUAiOkEJ3zlAw18eTBbXTt8NnZbMTU7MTUnMzsxccQ85gDlZDA7czDECTjHO0LELuYAm1snNjsxcuQA8Q==
