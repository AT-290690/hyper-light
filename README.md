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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFsIjsiM24iXVs0ZF07xBI1eCI7IjRExBdjIjsiMnXECmciXVszbsYhMG0iOyIwxDhQSSJdWzFsXTs1eFs6PVtqMDs1MDBdOzo9W3DHCy0%2BWy4uxBxpMDswLjjFHGTECzfFC2gwOypbUEk7MC41XcURbzA7M2dbMC4yxxBnMDvGUXEwOzHGCmIwOzJ1W8kyYcUyMcYNbjA7LjpbcTDGDm3NDnIw5ACOYzA75gCRbMR7bzA7MGxbaDAnM8Qia8gTbckTZjA7K8RybMdFZTA7LcRza8QQNETEG2EwO2YwO2UwXTsu5QCBZzA7YsYNbcUNYTBdO%2BUAtmbFCWHGLOUA2yvEBeQAu%2BUBCivEBSrkASpjxH7lAQ3lAJBkxG0%2FWzzELnHEWy5bcjBbMV07cjBbLTHFK2jkAJjSPzrJP8VwLcpwYjA7LuYArsUPYcQP5QCwJzXEVzBdOzNjWyc0

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNuIjsiMVoiOyIwWSJdWzRkXTvEFzV4IjsiNXMiOyIzYsQKdCI7IjZhxAV1IjsiMsQFM2ciOyI0QcQ%2FcCI7IjfEDzFxxBlZxDJWxC13Il1bM27GUzJLIl1bMFnGDTBNxHJRIl1bMVpdOzV4WzMwMDvEBC0%2BWy4uWzo9W2IwOy46W11dOzo9W2fLDGbIDDJLWzE2xDBhMDswTcQwfD5bN2dbMnVbMC41XTszZ8YIK1sxMDsqxCYxMF3ODyczO3w2d1vFDsQsXTt8NVZbKlswLjAyO2HELnwzWVsiY3JpbXNvbiJdO3w0QVsnNdB7Z99733vLey1bMTvFfzE7YcUjNXNbImRhcmtyZWTEfzNiyH%2FlASrGf2bff99%2Fy3%2FFezPrAPpibGFja%2BoA%2BDFwWzbFeWUwO2QwOy4uWzBR5AF5LT5bYzA7YTA7NnfECStbNnVbYzBdxm0wLjAwMSc1OzBR5AEp3yvJK2bfK8YrODsxcVsnNDs%3D

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBhIjsiMUgiOyIyeiJdWzRkXTvEFyoiXVswYcYMNkQiXVsxSMcNQiJdWzJ6XTttYWtldXNlcmludGVyZmFjZVtdO3w%2BWzo9W2EwxR1jb250YWluZXJbXV07fGluc2VydGludG%2FKGHw%2BW8QpYnV0dG9uxD%2FEDmxhYmVsWyJzYXkgaGVsbG8iXTt8c2V0c3R5bGVbIiDSAWJvcmRlcjogZGFzaGVkIDFweCBvcmFuZ2U71C1hY2tncm91bmQ6IHRyYW5zcGFyZW501Ctjb2xvcjogY3lhbtUfdXJzxCBwb%2BUBAtQjcGFkZGluZzogMTBweNQh5ADcNkRbLT5b9AEfYTDkAVHkARRwYXJhZ3JhcGhbIkjkARQh7QEVflsi5gCsIjs2QlsnMTA%3D

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNuIjsiMVoiOyIzYcQKbCJdWzRkXTvEHDV4IjsiNXQiOyI3Z8QhY8QhccQFcMQUQyI7IjbENTJ1xB7EIzbEMjNZxDdzxApiIjsiNEEiXVszbsZTME3EF0MiXVsxWsYSMnLEH2HHcmnEGmxdOyNbeDA7bjA7dDA7czBdOzo9W2UwOzXGCncwOzAuMjXFDGMwOyrEG3cwXcUQaDsqxBR3MDstMcYSdjA7LjpbImJsYWNrIjsiY3JpbXNvbiLGHW0wO2XGVWzJCnLFMcYgQTA7LT5bYTA7ZDA7LsQaK8QNKsQuZDAnNcQjRcUjxDUuWzo9W0swOzV0xD5%2BPVtrxRtxMDt1xR4%2FWyFbJcQPbeQAreQArCtbaDtjMCczxEh6MDs1aVswO%2BcAt0nOD2owO3w%2BWzdnWyVbKsRDYzBd5gDqxUzERsUTfDNZWy7kAPN6xBd8NEFbxl1pMDs6OltzxQZ0xB7kAVxJMF07eDA7asQrN0PkALpqMF07ME3kAM1pMF07P1s%2BW3UwO3EwXTtrMFs9xHcrxAXkAJN15AD%2BazBbMDstW%2BUBD20wXcUZS%2BcAz0roARdE6AEaZOUBlDszQ8QWLT7kAJRiMDvmATnFHj9bJVtiMDtsMF3kAW%2FFEyvEBTEnNMRSYTA7xSDlAPLmANRBMMQWZMQRRDDEEcUOJzfEH0flAcc6OlsiYTAiOzA7ImQwIjsxXeQBAsUSMcYS5AH0xxIt0hPHN%2BQAuM84zBPIOdMn0yYx5gEhQ%2BwCW%2BUBIWgwxHsycuQAuy0%2BW2fIGOYA6eUCei7EFsROXV3mARzGEWQwIic05AJS5AEyaOQBSmnEG2nkAz07dOQB1Sc2O2jnAZpIxV5KMOoBh%2BwAhXrNOeUBaUYwO0PqAWk%2FWyYmxCY8xBgyXV07LuUAonPlAlPlAjbGID7EIDPXICFbejBdOz3FXNAkMSc5xHZ55QCecDA7b%2BUCROYDPcUP5gHu5gIVeP8Aze4AzeUDHmkwO3gwXTvqAyfJfXTKL27nAkZCMDsxMDAwXTs1eFsxMzDkBITFacZgS%2BUDlnIwO3xFMFtdO3w2eFsxNTsxNSczOzFwxDzmAMJmMDt5MMQJOMc7SMQueDBbJzY7MXHkAMo%3D
