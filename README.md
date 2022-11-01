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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFsIjsiM2giXVszVl07xBI1aiI7IjRxIjsiMlfEBcQKM2HEIWjGITBtIjsiMMQ4UEkiXVsxbF07NWpbOj1bajA7NTAwXTs6PVtwxwstPlsuLsQcaTA7MC44xRxkxAs3xQtoMDsqW1BJOzAuNV3FETNkOzNhWzAuMscQZzA7xlFxMDsxxgpiMDsycVvJMmEwxDIxxg1uMDsuOltxMMYObc0OcjDkAI5jMDvmAJFsxHszZDswbFtoMCczxCJryBNtyRNmMDsrxHJsx0VlMDstxHNrxBA0ccQbYTA7ZjA7ZTBdOy7lAIFnMDtixg1txQ1hMF075QC2ZsUJYcYs5QDbK8QF5AC75QEKK8QFKuQBKmPEfuUBDeUAkGTEbT9bPMQuccRbLltyMFsxXTtyMFstMcUraOQAmNI/Osk/xXAtynBiMDsu5gCuxQ9hxA/lALAnNcRXMF07MldbJzQ=

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNoIjsiMVYiOyIwWSJdWzNWXTvEFzVqIjsiNWUiOyIyxBw1ZsQFSsQPcSI7IjNhIjsiNG7EOnAiOyI2TcQKxRlRxChFxBRlxE5oxk4yRSJdWzBZxg0wxC4wUSJdWzFWXTs1alszMDA7xAQtPlsuLls6PVtiMDsuOltdXTs6PVtnywxmyAwyRVsxNsQwYTA7ME3EMHw+WzZNWzJxWzAuNV07M2HGCCtbMTA7KsQmMTBdzg8nMzt8NmVbxQ7ELF07fDVFWypbMC4wMjthxC58M1FbImNyaW1zb24iXTt8NG5bJzXQe2ffe997y3stWzE7xX8xO2HFIzVlWyJkYXJrcmVkxH8yVsh/5QEqxn9m33/ff8t/xXsz6wD6YmxhY2vqAPgxcFs2xXllMDtkMDsuLlswUeQBeS0+W2MwO2EwOy49xAkicm90YXRpb24iOytbLs4SXeYAgjAuMDAxJzU7MFHkAT7fQN5AZt9A20A4OzFxWyc0Ow==

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBhIjsiMUYiOyIydiJdWzNWXTvEFyoiXVswYcYMNmwiXVsxRscNaiJdWzJ2XTs3altdO3w+Wzo9W2EwOzZGW11dO3w3clt8Pls1bsQbNERbInNheSBoZWxsbyJdO3wzWVsiINIBYm9yZGVyOiBkYXNoZWQgMXB4IG9yYW5nZTvTLTVKOiB0cmFuc3BhcmVudNQjY29sb3I6IGN5YW7VH3Vyc8QgcG9pbnRlctQjcGFkZGluZzogMTBweNQh5ADONmxbLT5bN3LkAP58Pls2R1siSOQA6iHnAOt+WyLmAIoiOzZqWycxMA==

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNoIjsiMVYiOyIyVcQKbCJdWzNWXTvEHDVqIjsiNWYiOyI2TcQhV8QhccQFcCI7IjfEGTVKxBnEFDNhxCjEFDNRxBllxBnEWDRuxFNoxlMwxEkzdSJdWzHHZTLEHzJVxg00VcQabF07Oj1bYzA7NTDFCnIwOzAuMjXFDGIwOyrEG3IwXcUQaDsqxBRyMDstMcYScTA7LjpbImJsYWNrIjsiY3JpbXNvbiLGHWswO2PGVWrJCm/FMcYgdTA7LT5beDt5Oy7EGCtbeDsqxCt5JzXEH3nFH8QxLls6PVtFMDs1ZsQ6fj1bMFfEG24wO3DFHj9bIVslxA9r5ACp5ACoK1toO2IwJzPESHQwOzRVWzA75wCzQ84PaDA7fD5bNk1bJVsqxENiMF3mAObFTMRGxRN8M1FbLuQA73TEF3w0blvGXWcwOzo6WyJzdGF0ZSLFC2FsaXZlIjt0MDsiMFgiO0MwXTsicmVuZGVyIjtoxD03ZuQAzGgwXTswTeQA32cwXTs/Wz5bcDA7bsQVV1s95ACJK8QF5AClcDAnNcQWMDstW+UBIGswXcUZRecA4UToASl46AEseeQBoTszdcQVLT7kAKVhMDvmAUrEHT9bJVthMDtqMF07eTvEEStbeTsxJzTETXg7xRzlAP7mAOB1MOQBpF1dO3gwxA94O3knN8QbQeUBy+QA83giOzA7InkiOzFd5QEDeCI7McUQ5AH0xhAt0BHGMeQAp80yyxHHM9Ej0SIx5gEHd+oCT+UBBTBpxG8ybuQAqS0+W2XoAR3mANPkAm4uxBUieOQCr+QBAsYPeSInNDvFPivEBT/EMC7EBegB5ecB4l07MCc2OzBpxn1CxWREMOoBcuoAiXTXQeUBYXowO3foAWE/WyYmxC48xBYyXV07LuUArsk45AJQ5QItxic+xCcz3ichW3QwXTs9xWjXKzEnOeQAiXPlALltMDts5QJJ5gNUxQ/mAfvmAh/mAsr/AOz1AOzlA0HEGsZDIl076gNQ7wCWxjTPSTBYIuYCeHYwOzEwMDBdOzVqWzEzMOQEuuUAiOkEJ3zlAw18eTBbXTt8NmZbMTU7MTUnMzsxcMQ85gDlZDA7czDECTjHO0LELuYAm1snNjsxceQA8Q==
