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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjF2IjsiM0oiXVs0QV07xBI1TiI7IjRXxBd5IjsiMkrECkMiXVszSsYhMG8iOyIwbiI7IlBJIl1bMXZdOzVOWzo9W2owOzUwMF07Oj1bcMcLLT5bLi7EHGkwOzAuOMUcZMQLN8ULaDA7KltQSTswLjVdxREyVTszQ1swLjLHEGcwO8ZRcTA7McYKYjA7MkpbyTJhMMQyMcYNbjA7LjpbcTDGDm3NDnIw5ACOYzA75gCRbMR7MlU7MG5baDAnM8Qia8gTb8kTZjA7K8RybMdFZTA7LcRza8QQNFfEG2EwO2YwO2UwXTsu5QCBZzA7YsYNbcUNYTBdO+UAtmbFCWHGLOUA2yvEBeQAu+UBCivEBSrkASpjxH7lAQ3lAJBkxG0/WzzELnHEWy5bcjBbMV07cjBbLTHFK2jkAJjSPzrJP8VwLcpwYjA7LuYArsUPYcQP5QCwJzXEVzBdOzN5Wyc0

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIxaCJdWzRBXTvEFzVOIjsiNUkiOyIzeMQKxCY2a8QrxAozQyI7IjRTxDV6IjsiN2rECkHEFHbEKGbEBUMiXVszSsZOM2QiXVsxaMYNMFkiOyIwSSJdWzJuXTs1TlszMDA7xAQtPlsuLls6PVtiMDsuOltdXTs6PVtnywxmyAwzZFsxNsQwYTA7MFnEMHw+WzdqWzJKWzAuNV07M0PGCCtbMTA7KsQmMTBdzg8nMzt8NkNbxQ7ELF07fDZmWypbMC4wMjthxC58NHZbImNyaW1zb24ixA9TWyc10Htn33vfe8t7LVsxO8V/MTthxSM1SVsiZGFya3JlZMR/M3jIf+UBKsZ/Zt9/33/Lf8V7M+sA+mJsYWNr6gD4MXpbNsV5ZTA7ZDA7Li5bMEnkAXktPltjMDthMDsuPcQJInJvdGF0aW9uIjsrWy7OEl3mAIIwLjAwMSc1OzBJ5AE+30DeQGbfQNtAODsxQVsnNDs=

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMVMiOyIyTyJdWzRBXTvEFyoiXVswYsYMNkoiXVsxU8cNSCJdWzJPXTs3RVtdO3w+Wzo9W2EwOzdkW11dO3w3TVt8Pls1UcQbNWhbInNheSBoZWxsbyJdO3w0Q1siINIBYm9yZGVyOiBkYXNoZWQgMXB4IG9yYW5nZTvTLTZrOiB0cmFuc3BhcmVudNQjY29sb3I6IGN5YW7VH3Vyc8QgcG9pbnRlctQjcGFkZGluZzogMTBweNQh5ADONkpbLT5bN03kAP58Pls3ZVsiSOQA6iHnAOt+WyLmAIoiOzZIWycxMA==

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIzdyI7IjF2Il1bNEFdO8QcNU4iOyI1xCE3asQhecQhQcQFesQUxAo2a8Q/xCMzQ8QPRCI7IjR2xDdJxBR4xA9TIl1bM0rGUzBZxBJhIl1bMm7GEjJmxB93x3J5Il1bMXZdOzo9W2MwOzUwxQpyMDswLjI1xQxiMDsqxBtyMF3FEGg7KsQUcjA7LTHGEnEwOy46WyJibGFj5ACdY3JpbXNvbiLGHWswO2PGVWrJCm/FMcYgdTA7LT5beDt5Oy7EGCtbeDsqxCt5JzXEH3nFH8QxLls6PVtFMDs1SsQ6fj1bMWbEG24wO3DFHj9bIVslxA9r5ACp5ACoK1toO2IwJzPESHQwOzV5WzA75wCzQ84PaDA7fD5bN2pbJVsqxENiMF3mAObFTMRGxRN8NHZbLuQA73TEF3w0U1vGXWcwOzo6WyJzdGF0ZSLFC2FsaXZlIjt0MDsiMWciO0MwXTsicmVuZGVyIjtoxD03QeQAzGgwXTswWeQA32cwXTs/Wz5bcDA7bjBdOzFmWz3kAIkrxAXkAKVwMCc1xBYwOy1b5QEga8QmXV07RecA4UToASl46AEseeQBoTs0YcQVLT7kAKVhMDvmAUrEHT9bJVthMDtqMF07eTvEEStbeTsxJzTETXg7xRzlAP7mAOB1MOQBpF1dO3gwxA94O3knN8QbQeUBy+QA83giOzA7InkiOzFd5QEDeCI7McUQ5AH0xhAt0BHGMeQAp80yyxHHM9Ej0SIx5gEHd+oCT+UBBTBrxG8yZuQAqS0+W2XoAR3mANPkAm4uxBUieOQCr+QBAsYPeSInNDvFPivEBT/EMC7EBegB5ecB4l07MCc2OzBrxn1CxWREMOoBcuoAiXTXQeUBYXowO3foAWE/WyYmxC48xBYyXV07LuUArsk45AJQ5QItxic+xCcz3ichW3QwXTs9xWjXKzEnOeQAiXPlALltMDts5QJJ5gNUxQ/mAfvmAh/mAsr/AOz1AOzlA0HEGsZDIl076gNQ7wCWxjTPSTFnIuYCeHYwOzEwMDBdOzVOWzEzMOQEuuUAiOkEJ3zlAw18eTBbXTt8NkRbMTU7MTUnMzsxesQ85gDlZDA7czDECTjHO0LELuYAm1snNjsxQeQA8Q==
