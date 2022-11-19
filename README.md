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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFmIjsiM2YiXVszUl07xBI1ZyI7IjRxIjsiMlXEBW3EBVnEIWbGITBqIjsiMGkiOyJQSSJdWzFmXTs1Z1s6PVtqMDs1MDBdOzo9W3DHCy0%2BWy4uxBxpMDswLjjFHGTECzfFC2gwOypbUEk7MC41XcURbzA7MllbMC4yxxBnMDvGUXEwOzHGCmIwOzJtW8kyYcUyMcYNbjA7LjpbcTDGDm3NDnIw5ACOYzA75gCRbMR7bzA7MGlbaDAnM8Qia8gTaskTZjA7K8RybMdFZTA7LcRza8QQNHHEG2EwO2YwO2UwXTsu5QCBZzA7YsYNbcUNYTBdO%2BUAtmbFCWHGLOUA2yvEBeQAu%2BUBCivEBSrkASpjxH7lAQ3lAJBkxG0%2FWzzELnHEWy5bcjBbMV07cjBbLTHFK2jkAJjSPzrJP8VwLcpwYjA7LuYArsUPYcQP5QCwJzXEVzBdOzJVWyc0

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNmIjsiMVIiOyIwUyJdWzNSXTvEFzVnIjsiNWIiOyIyVMQKY8QFQ8QFU8QUbcQFWSI7IjRuxD9qIjsiNkLECmsiOyIzTcQoeMQFVcRTZsZTMkMiXVswU8YNMEfEcksiXVsxUl07NWdbMzAwO8QELT5bLi5bOj1bYjA7LjpbXV07Oj1bZ8sMZsgMMkNbMTbEMGEwOzBHxDB8Pls2QlsybVswLjVdOzJZxggrWzEwOyrEJjEwXc4PJzM7fDVVW8UOxCxdO3w1eFsqWzAuMDI7YcQufDNNWyJjcmltc29uIl07fDRuWyc10Htn33vfe8t7LVsxO8V%2FMTthxiNiWyJkYXJrcmVkxH8yVMh%2F5QEqxn9m33%2Fff8t%2FxXsz6wD6YmxhY2vqAPgxals2xXllMDtkMDsuLlswS%2BQBeS0%2BW2MwO2EwOzVVxAkrWzVTW2MwXcZtMC4wMDEnNTswS%2BQBKd8ryStm3yvGKzg7MWtbJzQ7

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBhIjsiMUPEBUIiOyIyciI7IjBTIl1bM1JdO8QhNlkiOyI3ZyI7IjVuIjsiNEUiOyIzxBQ2RsQKV8QKdiJdWzBhxjA0RMQXVsQwa8QKU8QhT8QKaMRgdMQFc8QPacQjbMQFScRY5ACDNOQAgzRBxDJjxBlIxAp1Il1bMUPGXTbEPzZixCZ6xERnxBxCxxxzIl1bMnLGDTJD5ACTU107Oj1bajA7NnNbMjUwOzEyMjsxMjNdxRdpxRcxMDA7MzI7MTHGFWfFFTgwOzMwOznGE2jGKDgwOzEzMDszxxZmxhYxMDsyyBY0RFsuOlsiLmNvdW50ZXIiOzZ1W107NENbajBdOzZPW2kwXTsydFs6Olsic2l6ZSI7NWxbM107InR5cGUiOyJzb2xpZCI7ImNvbG9yIjtqMF1dOzJzxS90b3DFLjEwJzM7M2nFFGxlZnTHFV07InJpZ2jHD8VTyDE5XTsiYm90dG9txm85JzQ77AClOmhvduQAq%2FAAmDTqAJhkYXNoZesAmWbkAJk2T1tnxAjNTGFjdGl2ZSLkAPNn5gDzaOQAsTo9W2QwOy0%2BW2MwO2IwOzdnxAl8Pls6PVthMDs1bltdXTt8NEVbYjBdO3wzVlsix1AiXTt8NmJbLT5bZTs2RsQsPVtiMDsrxAUxJznEWGXFSTZ2W8Q6V1szaFsiZyJd8QEjNe4BIzUwJzY7MkNbNeQAlWQwxEYwJzM%3D

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNmIjsiMVIiOyIyU8QKZiJdWzNSXTvEHDVnIjsiNWMiOyI2QsQhVcQha8QFasQUVMQeQ8QZbcQFWcQPViI7IjNNxApixBTEIzRuxFNmxlMwR8QhcSJdWzHHZTJqIl1bMlPGDTRSxBpmXTsjW3gwO24wO3QwO3MwXTs6PVtlMDs1xgp3MDswLjI1xQxjMDsqxBt3MF3FEGg7KsQUdzA7LTHGEnYwOy46WyJibGFj5AC7Y3JpbXNvbiLGHW0wO2XGVWzJCnLFMcYgQTA7LT5bYTA7ZDA7LsQaK8QNKsQuZDAnNcQjRcUjxDUuWzo9W0swOzVjxD5%2BPVtrxRtxMDt1xR4%2FWyFbJcQPbeQAreQArCtbaDtjMCczxEh6MDs0UlswO%2BcAt0nOD2owO3w%2BWzZCWyVbKsRDYzBd5gDqxUzERsUTfDNNWy7kAPN6xBd8NG5bxl1pMDs6OltzxQZ0xB7kAVxJMF07eDA7asQrNlTkALpqMF07MEfkAM1pMF07P1s%2BW3UwO3EwXTtrMFs9xHcrxAXkAJN15AD%2BazBbMDstW%2BUBD20wXcUZS%2BcAz0roARdE6AEaZOUBlDszccQWLT7kAJRiMDvmATnFHj9bJVtiMDtsMF3kAW%2FFEyvEBTEnNMRSYTA7xSDlAPLmANRBMMQWZMQRRDDEEcUOJzfEH0flAcc6OlsiYTAiOzA7ImQwIjsxXeQBAsUSMcYS5AH0xxIt0hPHN%2BQAuM84zBPIOdMn0yYx5gEhQ%2BwCW%2BUBIWgwxHsyauQAuy0%2BW2fIGOYA6eUCei7EFsROXV3mARzGEWQwIic05AJS5AEyaOQBSmnEG2nkAz07dOQB1Sc2O2jnAZpIxV5KMOoBh%2BwAhXrNOeUBaUYwO0PqAWk%2FWyYmxCY8xBgyXV07LuUAonPlAlPlAjbGID7EIDPXICFbejBdOz3FXNAkMSc5xHZ55QCecDA7b%2BUCROYDPcUP5gHu5gIVeP8Aze4AzeUDHmkwO3gwXTvqAyfJfXTKL27nAkZCMDsxMDAwXTs1Z1sxMzDkBITFacZgS%2BUDlnIwO3xFMFtdO3w1VlsxNTsxNSczOzFqxDzmAMJmMDt5MMQJOMc7SMQueDBbJzY7MWvkAMo%3D
