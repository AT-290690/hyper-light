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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFsIjsiM2oiXVszWF07xBI1byI7IjR1IjsiMlnEBXPEIWPEIWrGITBtIjsiMMQ4UEkiXVsxbF07NW9bOj1bajA7NTAwXTs6PVtwxwstPlsuLsQcaTA7MC44xRxkxAs3xQtoMDsqW1BJOzAuNV3FETNmOzNjWzAuMscQZzA7xlFxMDsxxgpiMDsyc1vJMmEwxDIxxg1uMDsuOltxMMYObc0OcjDkAI5jMDvmAJFsxHszZjswbFtoMCczxCJryBNtyRNmMDsrxHJsx0VlMDstxHNrxBA0dcQbYTA7ZjA7ZTBdOy7lAIFnMDtixg1txQ1hMF075QC2ZsUJYcYs5QDbK8QF5AC75QEKK8QFKuQBKmPEfuUBDeUAkGTEbT9bPMQuccRbLltyMFsxXTtyMFstMcUraOQAmNI/Osk/xXAtynBiMDsu5gCuxQ9hxA/lALAnNcRXMF07MllbJzQ=

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNqIjsiMVgiOyIwWSJdWzNYXTvEFzVvIjsiNcQcMsQcNWvEBVDED3MiOyIzYyI7IjRyxDpwIjsiNlPECnHEGcQKNUvEFGvETmrGTjJHIl1bMFnGDTBNxG1RIl1bMVhdOzVvWzMwMDvEBC0+Wy4uWzo9W2IwOy46W11dOzo9W2fLDGbIDDJHWzE2xDBhMDswTcQwfD5bNlNbMnNbMC41XTszY8YIK1sxMDsqxCYxMF3ODyczO3w2a1vFDsQsXTt8NUtbKlswLjAyO2HELnwzU1siY3JpbXNvbiJdO3w0clsnNdB7Z99733vLey1bMTvFfzE7YcUjNWpbImRhcmtyZWTEfzJYyH/lASrGf2bff99/y3/FezPrAPpibGFja+oA+DFwWzbFeWUwO2QwOy4uWzBR5AF5LT5bYzA7YTA7Lj3ECSJyb3RhdGlvbiI7K1suzhJd5gCCMC4wMDEnNTswUeQBPt9A3kBm30DbQDg7MXFbJzQ7

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBhIjsiMUYiOyIyeCJdWzNYXTvEFyoiXVswYcYMNnIiXVsxRscNcCJdWzJ4XTs3cltdO3w+Wzo9W2EwOzZMW11dO3w3elt8Pls1dMQbNElbInNheSBoZWxsbyLEEWJbIiDSAWJvcmRlcjogZGFzaGVkIDFweCBvcmFuZ2U70y01UDogdHJhbnNwYXJlbnTUI2NvbG9yOiBjeWFu1R91cnPEIHBvaW50ZXLUI3BhZGRpbmc6IDEwcHjUIeQAzjZyWy0+Wzd65AD+fD5bNk1bIkjkAOoh5wDrflsi5gCKIjs2cFsnMTA=

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNqIjsiMVgiOyIyV8QKbCJdWzNYXTvEHDVvIjsiNWsiOyI2U8QhWcQhccQFcCI7IjdtxB5QxBlzIjsiM2PEKGzECsQtNcRYMsRYNHLEU2rGUzBNxCF3Il1bMcdlMnAiXVsyV8YNNFrEGmxdOzo9W2MwOzUwxQpyMDswLjI1xQxiMDsqxBtyMF3FEGg7KsQUcjA7LTHGEnEwOy46WyJibGFj5AC7Y3JpbXNvbiLGHWswO2PGVWrJCm/FMcYgdTA7LT5beDt5Oy7EGCtbeDsqxCt5JzXEH3nFH8QxLls6PVtFMDs1a8Q6fj1bMFfEG24wO3DFHj9bIVslxA9r5ACp5ACoK1toO2IwJzPESHQwOzRaWzA75wCzQ84PaDA7fD5bNlNbJVsqxENiMF3mAObFTMRGxRN8M1NbLuQA73TEF3w0clvGXWcwOzo6WyJzdGF0ZSLFC2FsaXZlIjt0MDsiMFgiO0MwXTsicmVuZGVyIjtoxD03beQAzGgwXTswTeQA32cwXTs/Wz5bcDA7bsQVV1s95ACJK8QF5AClcDAnNcQWMDstW+UBIGswXcUZRecA4UToASl46AEseeQBoTszd8QVLT7kAKVhMDvmAUrEHT9bJVthMDtqMF07eTvEEStbeTsxJzTETXg7xRzlAP7mAOB1MOQBpF1dO3gwxA94O3knN8QbQeUBy+QA83giOzA7InkiOzFd5QEDeCI7McUQ5AH0xhAt0BHGMeQAp80yyxHHM9Ej0SIx5gEHd+oCT+UBBTBpxG8ycOQAqS0+W2XoAR3mANPkAm4uxBUieOQCr+QBAsYPeSInNDvFPivEBT/EMC7EBegB5ecB4l07MCc2OzBpxn1CxWREMOoBcuoAiXTXQeUBYXowO3foAWE/WyYmxC48xBYyXV07LuUArsk45AJQ5QItxic+xCcz3ichW3QwXTs9xWjXKzEnOeQAiXPlALltMDts5QJJ5gNUxQ/mAfvmAh/mAsr/AOz1AOzlA0HEGsZDIl076gNQ7wCWxjTPSTBYIuYCeHYwOzEwMDBdOzVvWzEzMOQEuuUAiOkEJ3zlAw18eTBbXTt8NmxbMTU7MTUnMzsxcMQ85gDlZDA7czDECTjHO0LELuYAm1snNjsxceQA8Q==
