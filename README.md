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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjF2IjsiM0oiXVs0QV07xBI1TiI7IjRXxBd5IjsiMkrECkMiXVszSsYhMG8iOyIwbiI7IlBJIl1bMXZdOzVOWzo9W2owOzUwMF07Oj1bcMcLLT5bLi7EHGkwOzAuOMUcZMQLN8ULaDA7KltQSTswLjUnMsQRMlU7M0NbMC4yxxBnMDvGUXEwOzHGCmIwOzJKW8kyYTDEMjHGDW4wOy46W3Ewxg5tzQ5yMOQAjmMwO+YAkWzEezJVOzBuW2gwJzPEImvIE2/JE2YwOyvEcmzHRWUwOy3Ec2vEEDRXxBthMDtmMDtlMF07LuUAgWcwO2LGDW3FDWEwXTvlALZmxQlhxizlANsrxAXkALvlAQorxAUq5AEqY8R+5QEN5QCQZMRtP1s8xC5xxFsuW3IwWzFdO3IwWy0xxSto5ACY0j86yT/FcC3KcGIwOy7mAK7FD2HED+UAsCc1xFcwXTszeVsnNA==

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIxaCJdWzRBXTvEFzVOIjsiNUkiOyIzeMQKxCY2a8QrxAozQyI7IjRTxDV6IjsiN2rECkHEFHbEKGbEBUMiXVszSsZOM2QiXVsxaMYNMFkiOyIwSSJdWzJuXTs1TlszMDA7xAQtPlsuLls6PVtiMDsuOlsnMjs6PVtnywxmyAwzZFsxNsQwYTA7MFnEMHw+WzdqWzJKWzAuNV07M0PGCCtbMTA7KsQmMTAnMs4PMzt8NkNbxQ4wLjUnMjt8NmZbKlswLjAyO2HELnw0dlsiY3JpbXNvbiJdO3w0U1snNdB7Z99733vLey1bMTvFfzHEfzM7fDVJWyJkYXJrcmVkxH8zeMh/5QEqxn9m33/ff8t/xXsz6wD6YmxhY2vqAPgxels2xXllMDtkMDsuLlswSeQBeS0+W2MwO2EwOy49xAkicm90YXRpb24iOytbLs4SXeYAgjAuMDAxJzU7MEnkAT7fQN5AZt9A20A4OzFBWyc0Ow==

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMVMiOyIyTyJdWzRBXTvEFyoiXVswYsYMNkoiXVsxU8cNSCJdWzJPXTs3RVtdO3w+Wzo9W2EwOzdkWycyO3w3TVt8Pls1UcQbNWhbInNheSBoZWxsbyJdO3w0Q1siINIBYm9yZGVyOiBkYXNoZWQgMXB4IG9yYW5nZTvTLTZrOiB0cmFuc3BhcmVudNQjY29sb3I6IGN5YW7VH3Vyc8QgcG9pbnRlctQjcGFkZGluZzogMTBweNQh5ADONkpbLT5bN03kAP58Pls3ZVsiSOQA6iHnAOt+WyLmAIoiOzZIWycxMA==

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIzdyI7IjF2Il1bNEFdO8QcNU4iOyI1xCE3asQhecQhQcQFesQUxAo2a8Q/xCMzQ8QPRCI7IjR2xDdJxBR4xA9TIl1bM0rGUzBZxBJhIl1bMm7GEjJmxB93x3J5Il1bMXZdOzo9W2MwOzUwxQpyMDswLjI1xQxiMDsqxBtyMCcyxBBoOyrEFHIwOy0xxhJxMDsuOlsiYmxhY+QAnWNyaW1zb24ixh1rMDtjxlVqyQpvxTHGIHUwOy0+W3g7eTsuxBgrW3g7KsQreSc1xB95xR/EMS5bOj1bRTA7NUrEOn49WzFmxBtuMDtwxR4/WyFbJcQPa+QAqeQAqCtbaDtiMCczxEh0MDs1eVswO+cAs0POD2gwO3w+WzdqWyVbKsRDYjBd5gDmxUzERsUTfDR2Wy7kAO90xBd8NFNbxl1nMDs6Olsic3RhdGUixQthbGl2ZSI7dDA7IjFnIjtDMF07InJlbmRlciI7aMQ9N0HkAMxoMF07MFnkAN9nMF07P1s+W3AwO24wXTsxZls95ACJK8QF5AClcDAnNcQWMDstW+UBIGvEJicyO0XnAOFE6AEpeOgBLHk7LTFdOzRhxBUtPuQApWEwO+YBSsQdP1slW2EwO2owXTt5O8QRK1t5OzEnNMRNeDvFHOUA/uYA4HUw5AGkJzI7eDDED8QMN8QbQeUBy+QA83giOzA7InkiOzFd5QEDeCI7McUQ5AH0xhAt0BHGMeQAp80yyxHHM9Ej0SIx5gEHd+oCT+UBBTBrxG8yZuQAqS0+W2XoAR3mANPkAm4uxBUieOQCr+QBAsYPeSInNDvFPivEBT/EMC7EBegB5ecB4l07MCc2OzBrxn1CxWREMOoBcuoAiXTWQeYBYXowO3foAWE/WyYmxC48xBYyJzI7LuUArsk45AJQ5QItxic+xCcz3ichW3QwXTs9xWjXKzEnOeQAiXPlALltMDts5QJJ5gNUxQ/mAfvmAh/mAsr/AOz1AOzlA0HEGsZDIl076gNQ7wCWxjTPSTFnIuYCeHYwOzEwMDBdOzVOWzEzMOQEuuUAiOkEJ3zlAw18eTBbXTt8NkRbMTU7MTUnMzsxesQ85gDlZDA7czDECTjHO0LELuYAm1snNjsxQeQA8Q==
