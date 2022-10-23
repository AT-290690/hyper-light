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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFDIjsiM1IiXVs0Sl07xBI1VyI7IjVmxBdHIjsiMlLECksiXVszUsYhMHAiOyIwbyI7IlBJIl1bMUNdOzVXWzo9W2owOzUwMF07Oj1bcMcLLT5bLi7EHGkwOzAuOMUcZMQLN8ULaDA7KltQSTswLjVdxREzYzszS1swLjLHEGcwO8ZRcTA7McYKYjA7MlJbyTJhMMQyMcYNbjA7LjpbcTDGDm3NDnIw5ACOYzA75gCRbMR7M2M7MG9baDAnM8Qia8gTcMkTZjA7K8RybMdFZTA7LcRza8QQNWbEG2EwO2YwO2UwXTsu5QCBZzA7YsYNbcUNYTBdO+UAtmbFCWHGLOUA2yvEBeQAu+UBCivEBSrkASpjxH7lAQ3lAJBkxG0/WzzELnHEWy5bcjBbMV07cjBbLTHFK2jkAJjSPzrJP8VwLcpwYjA7LuYArsUPYcQP5QCwJzXEVzBdOzNHWyc0

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNSIjsiMnUiOyIxbyJdWzRKXTvEFzVXIjsiNcQcM0bEClMiOyI2xCYyxRRLxBRixDVHIjsiN3bECkgiOyI0RcQocMQFTyJdWzNSxk4zbCJdWzFvxg0xxDgwTCJdWzJ1XTs1V1szMDA7xAQtPlsuLls6PVtiMDsuOltdXTs6PVtnywxmyAwzbFsxNsQwYTA7MWLEMHw+Wzd2WzJSWzAuNV07M0vGCCtbMTA7KsUmMF3ODyczO3w2T1vFDsQsXTt8NnBbKlswLjAyO2HELnw0RVsiY3JpbXNvbiJdO3w1YlsnNdB7Z99733vLey1bMTvFfzE7YcUjNVJbImRhcmtyZWTEfzNGyH/lASrGf2bff99/y3/FezPrAPpibGFja+oA+DFHWzbFeWUwO2QwOy4uWzBM5AF5LT5bYzA7YTA7Lj3ECSJyb3RhdGlvbiI7K1suzhJd5gCCMC4wMDEnNTswTOQBPt9A3kBm30DbQDg7MUhbJzQ7

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMVoiOyIyVyJdWzRKXTvEFyoiXVswYsYMNlYiXVsxWscNVCJdWzJXXTs3UltdO3w+Wzo9W2EwOzdwW11dO3w3Wlt8Pls1WsQbNXFbInNheSBoZWxsbyJdO3w0TFsiINIBYm9yZGVyOiBkYXNoZWQgMXB4IG9yYW5nZTvTLTZ1OiB0cmFuc3BhcmVudNQjY29sb3I6IGN5YW7VH3Vyc8QgcG9pbnRlctQjcGFkZGluZzogMTBweNQh5ADONlZbLT5bN1rkAP58Pls3cVsiSOQA6iHnAOt+WyLmAIoiOzZUWycxMA==

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNSIjsiMnUiOyIzRSI7IjFDIl1bNEpdO8QcNVciOyI1UyI7Ijd2xCFHxCFIxAXECjdOIjsiNsQ6MsREM0vED1AiOyI0xEk1xRRGxApiIl1bM1LGUzFixCFpIl1bMnXGEjJtxB9Fx3JIIl1bMUNdOzo9W2MwOzUwxQpyMDswLjI1xQxiMDsqxBtyMF3FEGg7KsQUcjA7LTHGEnEwOy46WyJibGFjayI7ImNyaW1zb24ixh1rMDtjxlVqyQpvxTHGIHUwOy0+W3g7eTsuxBgrW3g7KsQreSc1xB95xR/EMS5bOj1bRTA7NVPEOn49WzFtxBtuMDtwxR4/WyFbJcQPa+QAqeQAqCtbaDtiMCczxEh0MDs1SFswO+cAs0POD2gwO3w+Wzd2WyVbKsRDYjBd5gDmxUzERsUTfDRFWy7kAO90xBd8NWJbxl1nMDs6Olsic3RhdGUixQthbGl2ZSI7dDA7IjFpIjtDMF07InJlbmRlciI7aMQ9N07kAMxoMF07MWLkAN9nMF07P1s+W3AwO27EFW1bPeQAiSvEBeQApXAwJzXEFjA7LVvlASBrxCZdXTtF5wDhROgBKXjoASx55AGhOzRpxBUtPuQApWEwO+YBSsQdP1slW2EwO2owXTt5O8QRK1t5OzEnNMRNeDvFHOUA/uYA4HUw5AGkXV07eDDED3g7eSc3xBtB5QHL5ADzeCI7MDsieSI7MV3lAQN4IjsxxRDkAfTGEC3QEcYx5ACnzTLLEccz0SPRIjHmAQd36gJP5QEFMGzEbzJt5ACpLT5bZegBHeYA0+QCbi7EFSJ45AKv5AECxg95Iic0O8U+K8QFP8QwLsQF6AHl5wHiXTswJzY7MGzGfULFZEQw6gFy6gCJdNdB5QFhejA7d+gBYT9bJibELjzEFjJdXTsu5QCuyTjkAlDlAi3GJz7EJzPeJyFbdDBdOz3FaNcrMSc55ACJc+UAuW0wO2zlAknmA1TFD+YB++YCH+YCyv8A7PUA7OUDQcQaxkMiXTvqA1DvAJbGNM9JMWki5gJ4djA7MTAwMF07NVdbMTMw5AS65QCI6QQnfOUDDXx5MFtdO3w2UFsxNTsxNSczOzFHxDzmAOVkMDtzMMQJOMc7QsQu5gCbWyc2OzFI5ADx
