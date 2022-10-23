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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjF5IjsiM04iXVs0Rl07xBI1UyI7IjVixBdDIjsiMk7ECkciXVszTsYhMHAiOyIwbyI7IlBJIl1bMXldOzVTWzo9W2owOzUwMF07Oj1bcMcLLT5bLi7EHGkwOzAuOMUcZMQLN8ULaDA7KltQSTswLjVdxREyWTszR1swLjLHEGcwO8ZRcTA7McYKYjA7Mk5byTJhMMQyMcYNbjA7LjpbcTDGDm3NDnIw5ACOYzA75gCRbMR7Mlk7MG9baDAnM8Qia8gTcMkTZjA7K8RybMdFZTA7LcRza8QQNWLEG2EwO2YwO2UwXTsu5QCBZzA7YsYNbcUNYTBdO+UAtmbFCWHGLOUA2yvEBeQAu+UBCivEBSrkASpjxH7lAQ3lAJBkxG0/WzzELnHEWy5bcjBbMV07cjBbLTHFK2jkAJjSPzrJP8VwLcpwYjA7LuYArsUPYcQP5QCwJzXEVzBdOzNDWyc0


## Link to Excercises:
https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNOIjsiMnEiOyIxayJdWzRGXTvEFzVTIjsiNcQcM0LECk8iOyI2xCYyxRRHIjsiNFjENUMiOyI3csQKRMQUQcQobMQFSyJdWzNOxk4zaCJdWzFrxg0wWiI7IjBKIl1bMnFdOzVTWzMwMDvEBC0+Wy4uWzo9W2IwOy46W11dOzo9W2fLDGbIDDNoWzE2xDBhMDswWsQwfD5bN3JbMk5bMC41XTszR8YIK1sxMDsqxCYxMF3ODyczO3w2S1vFDsQsXTt8NmxbKlswLjAyO2HELnw0QVsiY3JpbXNvbiLED1hbJzXQe2ffe997y3stWzE7xX8xO2HFIzVOWyJkYXJrcmVkxH8zQsh/5QEqxn9m33/ff8t/xXsz6wD6YmxhY2vqAPgxQ1s2xXllMDtkMDsuLlswSuQBeS0+W2MwO2EwOy49xAkicm90YXRpb24iOytbLs4SXeYAgjAuMDAxJzU7MErkAT7fQN5AZt9A20A4OzFEWyc0Ow==

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMVYiOyIyUyJdWzRGXTvEFyoiXVswYsYMNlIiXVsxVscNUCJdWzJTXTs3TVtdO3w+Wzo9W2EwOzdsW11dO3w3VVt8Pls1VsQbNW1bInNheSBoZWxsbyJdO3w0SFsiINIBYm9yZGVyOiBkYXNoZWQgMXB4IG9yYW5nZTvTLTZxOiB0cmFuc3BhcmVudNQjY29sb3I6IGN5YW7VH3Vyc8QgcG9pbnRlctQjcGFkZGluZzogMTBweNQh5ADONlJbLT5bN1XkAP58Pls3bVsiSOQA6iHnAOt+WyLmAIoiOzZQWycxMA==

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNOIjsiMnEiOyIzQSI7IjF5Il1bNEZdO8QcNVMiOyI1TyI7IjdyxCFDxCFExAXECjdJIjsiNsQ6MsREM0fED0wiOyI0xEk1xRRCxA9YIl1bM07GUzBaxBJlIl1bMnHGEjJpxB9Bx3JEIl1bMXldOzo9W2MwOzUwxQpyMDswLjI1xQxiMDsqxBtyMF3FEGg7KsQUcjA7LTHGEnEwOy46WyJibGFjayI7ImNyaW1zb24ixh1rMDtjxlVqyQpvxTHGIHUwOy0+W3g7eTsuxBgrW3g7KsQreSc1xB95xR/EMS5bOj1bRTA7NU/EOn49WzFpxBtuMDtwxR4/WyFbJcQPa+QAqeQAqCtbaDtiMCczxEh0MDs1RFswO+cAs0POD2gwO3w+WzdyWyVbKsRDYjBd5gDmxUzERsUTfDRBWy7kAO90xBd8NFhbxl1nMDs6Olsic3RhdGUixQthbGl2ZSI7dDA7IjFqIjtDMF07InJlbmRlciI7aMQ9N0nkAMxoMF07MFrkAN9nMF07P1s+W3AwO24wXTsxaVs95ACJK8QF5AClcDAnNcQWMDstW+UBIGvEJl1dO0XnAOFE6AEpeOgBLHnkAaE7NGXEFS0+5AClYTA75gFKxB0/WyVbYTA7ajBdO3k7xBErW3k7MSc0xE14O8Uc5QD+5gDgdTDkAaRdXTt4MMQPeDt5JzfEG0HlAcvkAPN4IjswOyJ5IjsxXeUBA3giOzHFEOQB9MYQLdARxjHkAKfNMssRxzPRI9EiMeYBB3fqAk/lAQUwbMRvMmnkAKktPltl6AEd5gDT5AJuLsQVInjkAq/kAQLGD3kiJzQ7xT4rxAU/xDAuxAXoAeXnAeJdOzAnNjswbMZ9QsVkRDDqAXLqAIl010HlAWF6MDt36AFhP1smJsQuPMQWMl1dOy7lAK7JOOQCUOUCLcYnPsQnM94nIVt0MF07PcVo1ysxJznkAIlz5QC5bTA7bOUCSeYDVMUP5gH75gIf5gLK/wDs9QDs5QNBxBrGQyJdO+oDUO8AlsY0z0kxaiLmAnh2MDsxMDAwXTs1U1sxMzDkBLrlAIjpBCd85QMNfHkwW107fDZMWzE1OzE1JzM7MUPEPOYA5WQwO3MwxAk4xztCxC7mAJtbJzY7MUTkAPE=
