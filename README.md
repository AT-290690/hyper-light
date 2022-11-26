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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFmIjsiM2YiXVszUl07xBI1aCI7IjRxIjsiMlXEBW3EBVnEIWbGITBqIjsiMGkiOyJQSSJdWzFmXTs1aFs6PVtqMDs1MDBdOzo9W3DHCy0%2BWy4uxBxpMDswLjjFHGTECzfFC2gwOypbUEk7MC41XcURbzA7MllbMC4yxxBnMDvGUXEwOzHGCmIwOzJtW8kyYcUyMcYNbjA7LjpbcTDGDm3NDnIw5ACOYzA75gCRbMR7bzA7MGlbaDAnM8Qia8gTaskTZjA7K8RybMdFZTA7LcRza8QQNHHEG2EwO2YwO2UwXTsu5QCBZzA7YsYNbcUNYTBdO%2BUAtmbFCWHGLOUA2yvEBeQAu%2BUBCivEBSrkASpjxH7lAQ3lAJBkxG0%2FWzzELnHEWy5bcjBbMV07cjBbLTHFK2jkAJjSPzrJP8VwLcpwYjA7LuYArsUPYcQP5QCwJzXEVzBdOzJVWyc0

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNmIjsiMVIiOyIwUyJdWzNSXTvEFzVoIjsiNWMiOyIyVMQKZMQFRMQFxA8ybcQFWSI7IjRuxD9qIjsiNkjECmsiOyIzTcQoecQFVsRTZsZTMkMiXVswU8YNMEfEcksiXVsxUl07NWhbMzAwO8QELT5bLi5bOj1bYjA7LjpbXV07Oj1bZ8sMZsgMMkNbMTbEMGEwOzBHxDB8Pls2SFsybVswLjVdOzJZxggrWzEwOyrEJjEwXc4PJzM7NVZbxQ3EK107NXlbKlswLjAyO2HELDNNWyJjcmltc29uIl07NG5bJzXQd2ffd993yXctWzE7xXsxO2HFIWNbImRhcmtyZWQiXTsyVMh75QEixntm33vfe%2B4A8jPqAPJibGFja%2BkA8DFqWzbFdWUwO2QwOy4uWzBL5AFtLT5bYzA7YTDEUGMwOytbNVRbYzBdxmkwLjAwMSc1OzBL5AEh3yvJK2bfK8YrODsxa1snNDs%3D

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBhIjsiMUPEBUIiOyIyciI7IjBTIl1bM1JdO8QhN2kiOyI3cSI7IjVvIjsiNEUiOyIzWSI7IjZMxApXxAp4Il1bMGHGMDRExBdWxDBsxApTxCFVxApoxGB0xAVzxA%2FEWDVtxAVKxFjkAIM05ACDNEHEMmTEGUnECnciXVsxQ8ZdNnbEEmPEJnrERGfEHELHHHUiXVsycsYNMkPkAJNTXTs6PVtqMDs2dVsyNTA7MTIyOzEyM13FF2nFFzEwMDszMjsxMcYVZ8UVODA7MzA7OcYTaMYoODA7MTMwOzPHFmbGFjEwOzLIFjREWy46WyIuY291bnRlciI7NndbXTs0Q1tqMF07NlVbaTBdOzJ0Wzo6WyJzaXplIjs1bVszXTsidHlwZSI7InNvbGnkAPZjb2xvciI7ajBdXTsyc8UvdG9wxS4xMCczOzNpxRRsZWZ0xxVdOyJyaWdoxw%2FFU8gxOV07ImJvdHRvbcZvOSc0O%2BwApTpob3bkAKvwAJg06gCYZGFzaGXrAJlm5ACZNlVbZ8QIzUxhY3RpdmUi5ADzZ%2BYA82jkALE6PVtkMDstPltjMDtiMDs3ccQJfD5bOj1bYTA7NW9b5AE8RVtiMF07M1ZbIsdOIl07NmNbLT5bZTs2TMQpPVtiMDsrxAUxJznEVWXFRjZ4W107M1dbM2hbImciXfEBHzXuAR81MCc2OzJDWzXkAJFkMMRFMCcz

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNmIjsiMVIiOyIyU8QKZiJdWzNSXTvEHDVoIjsiNWQiOyI2SMQhVcQha8QFaiI7IjdjxB5ExBltxAVZxA9XIjsiM03ECsQeMlQiOyI0bsRTZsZTMEfEIXEiXVsxx2UyaiJdWzJTxg00U8QaZl07I1t4MDtuMDt0MDtzMF07Oj1bZTA7NcYKdzA7MC4yNcUMYzA7KsQbdzBdxRBoOyrEFHcwOy0xxhJ2MDsuOlsiYmxhY%2BQAu2NyaW1zb24ixh1tMDtlxlVsyQpyxTHGIEEwOy0%2BW2EwO2QwOy7EGivEDSrELmQwJzXEI0XFI8Q1Lls6PVtLMDs1ZMQ%2Bfj1ba8UbcTA7dcUeP1shWyXED23kAK3kAKwrW2g7YzAnM8RIejA7NFNbMDvnALdJzg9qMDt8Pls2SFslWyrEQ2MwXeYA6sVMxEbFEzNNWy7kAPJ6xBY0blvGW2kwOzo6W3PFBnTEHeQBWkkwXTt4MDtqxCo3Y%2BQAuGowXTswR%2BQAy2kwXTs%2FWz5bdTA7cTBdO2swWz3EdSvEBeQAkXXkAPxrMFswOy1b5QENbTBdxRlL5wDNSugBFUToARhk5QGSOzNxxBYtPuQAlGIwO%2BYBN8UeP1slW2IwO2wwXeQBbcUTK8QFMSc0xFJhMDvFIOUA8OYA1EEwxBZkxBFEMMQRxQ4nN8QfR%2BUBxTo6WyJhMCI7MDsiZDAiOzFd5AECxRIxxhLkAfLHEi3SE8c35AC4zzjME8g50yfTJjHmASFD7AJZ5QEhaDDEezJq5AC7LT5bZ8gY5gDp5QJ4LsQWxE5dXeYBHMYRZDAiJzTkAlDkATJo5AFKacQbaeQDOzt05AHVJzY7aOcBmkjFXkow6gGH7ACFes055QFpRjA7Q%2BoBaT9bJibEJjzEGDJdXTsu5QCic%2BUCU%2BUCNsYgPsQgM9cgIVt6MF07PcVc0CQxJznEdnnlAJ5wMDtv5QJE5gM7xQ%2FmAe7mAhV4%2FwDN7gDN5QMdaTA7eDBdO%2BoDJsl9dMovbucCRkIwOzEwMDBdOzVoWzEzMOQEgsVpxmBL5QOUcjA7RTBbXTs1V1sxNTsxNSczOzFqxDrmAMBmMDt5MMQJOMc5SMQteDBbJzY7MWvkAMg%3D
