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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFsIjsiM2wiXVszWl07xBI1cSI7IjR3xBdhIjsiMnXECmXEIWzGITBtIjsiMMQ4UEkiXVsxbF07NXFbOj1bajA7NTAwXTs6PVtwxwstPlsuLsQcaTA7MC44xRxkxAs3xQtoMDsqW1BJOzAuNV3FETNoOzNlWzAuMscQZzA7xlFxMDsxxgpiMDsydVvJMmEwxDIxxg1uMDsuOltxMMYObc0OcjDkAI5jMDvmAJFsxHszaDswbFtoMCczxCJryBNtyRNmMDsrxHJsx0VlMDstxHNrxBA0d8QbYTA7ZjA7ZTBdOy7lAIFnMDtixg1txQ1hMF075QC2ZsUJYcYs5QDbK8QF5AC75QEKK8QFKuQBKmPEfuUBDeUAkGTEbT9bPMQuccRbLltyMFsxXTtyMFstMcUraOQAmNI%2FOsk%2FxXAtynBiMDsu5gCuxQ9hxA%2FlALAnNcRXMF07M2FbJzQ%3D

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNsIjsiMVoiOyIwWSJdWzNaXTvEFzVxIjsiNcQcMsQcNW3EBVLED3UiOyIzZSI7IjR0xDpwIjsiNlXECsQyM8QKNU3EFG3ETmzGTjJJIl1bMFnGDTDEHzBRIl1bMVpdOzVxWzMwMDvEBC0%2BWy4uWzo9W2IwOy46W11dOzo9W2fLDGbIDDJJWzE2xDBhMDswTcQwfD5bNlVbMnVbMC41XTszZcYIK1sxMDsqxCYxMF3ODyczO3w2bVvFDsQsXTt8NU1bKlswLjAyO2HELnwzVVsiY3JpbXNvbiJdO3w0dFsnNdB7Z99733vLey1bMTvFfzE7YcUjNWxbImRhcmtyZWTEfzJayH%2FlASrGf2bff99%2Fy3%2FFezPrAPpibGFja%2BoA%2BDFwWzbFeWUwO2QwOy4uWzBR5AF5LT5bYzA7YTA7Lj3ECSJyb3RhdGlvbiI7K1suzhJd5gCCMC4wMDEnNTswUeQBPt9A3kBm30DbQDg7MXFbJzQ7

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBhIjsiMUgiOyIyeiJdWzNaXTvEFyoiXVswYcYMNnQiXVsxSMcNciJdWzJ6XTs3dFtdO3w%2BWzo9W2EwOzZOW11dO3w3Q1t8Pls1dsQbNEtbInNheSBoZWxsbyLEEWRbIiDSAWJvcmRlcjogZGFzaGVkIDFweCBvcmFuZ2U70y01UjogdHJhbnNwYXJlbnTUI2NvbG9yOiBjeWFu1R91cnPEIHBvaW50ZXLUI3BhZGRpbmc6IDEwcHjUIeQAzjZ0Wy0%2BWzdD5AD%2BfD5bNk9bIkjkAOoh5wDrflsi5gCKIjs2clsnMTA%3D

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNsIjsiMVoiOyIyWcQKbCJdWzNaXTvEHDVxIjsiNW0iOyI2VSI7IjNhxCHEFDFwIjsiN2%2FEHlLEOnXEHmXEKG7ECsQtNcRYMsRYNHTEU2zGUzBNxCF5Il1bMcdlMnIiXVsyWcdyYsQabF07Oj1bYzA7NTDFCnIwOzAuMjXFDGIwOyrEG3IwXcUQaDsqxBRyMDstMcYScTA7LjpbImJsYWNrIjsiY3JpbXNvbiLGHWswO2PGVWrJCm%2FFMcYgdTA7LT5beDt5Oy7EGCtbeDsqxCt5JzXEH3nFH8QxLls6PVtFMDs1bcQ6fj1bMFfEG24wO3DFHj9bIVslxA9r5ACp5ACoK1toO2IwJzPESHQwOzViWzA75wCzQ84PaDA7fD5bNlVbJVsqxENiMF3mAObFTMRGxRN8M1VbLuQA73TEF3w0dFvGXWcwOzo6WyJzdGF0ZSLFC2FsaXZlIjt0MDsiMFgiO0MwXTsicmVuZGVyIjtoxD03b%2BQAzGgwXTswTeQA32cwXTs%2FWz5bcDA7bsQVV1s95ACJK8QF5AClcDAnNcQWMDstW%2BUBIGswXcUZRecA4UToASl46AEseeQBoTszecQVLT7kAKVhMDvmAUrEHT9bJVthMDtqMF07eTvEEStbeTsxJzTETXg7xRzlAP7mAOB1MOQBpF1dO3gwxA94O3knN8QbQeUBy%2BQA83giOzA7InkiOzFd5QEDeCI7McUQ5AH0xhAt0BHGMeQAp80yyxHHM9Ej0SIx5gEHd%2BoCT%2BUBBTBpxG8ycuQAqS0%2BW2XoAR3mANPkAm4uxBUieOQCr%2BQBAsYPeSInNDvFPivEBT%2FEMC7EBegB5ecB4l07MCc2OzBpxn1CxWREMOoBcuoAiXTXQeUBYXowO3foAWE%2FWyYmxC48xBYyXV07LuUArsk45AJQ5QItxic%2BxCcz3ichW3QwXTs9xWjXKzEnOeQAiXPlALltMDts5QJJ5gNUxQ%2FmAfvmAh%2FmAsr%2FAOz1AOzlA0HEGsZDIl076gNQ7wCWxjTPSTBYIuYCeHYwOzEwMDBdOzVxWzEzMOQEuuUAiOkEJ3zlAw18eTBbXTt8Nm5bMTU7MTUnMzsxcMQ85gDlZDA7czDECTjHO0LELuYAm1snNjsxceQA8Q%3D%3D
