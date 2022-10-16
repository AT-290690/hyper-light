# Hyper Light

<p align="center">
<img  width="100" alt="Star Light Logo" src="https://user-images.githubusercontent.com/88512646/196051171-dd4aea30-a241-45c1-890e-be1a3fd3ead2.svg" />
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
;; Web Editor [Create web apps directly on the web with autocomplete; logger; live preview on the side]
```

<p align="center">
<img width="336" alt="Screenshot 2022-10-02 at 22 06 54" src="https://user-images.githubusercontent.com/88512646/193471696-c2594bf6-085a-4b21-921f-06bb4f5fa0fe.png" />
</p>
Here is the source for the tree above

```go
<- ["MATH"; "SKETCH"] [UNIVERSE];
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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjF2IjsiM0oiXVs1ZV07xBI1TiI7IjRWxBd5IjsiMkrECkMiXVszSsYhMG8iOyIwbiI7IlBJIl1bMXZdOzVOWzo9W1dJRFRIOzUwMF07Oj1bSEVJR0hUxg8tPlsuLsQjdGhldGE7MC44xSNzdGVwOzAuN8UNYW5nbGU7KltQSTswLjUnMsQUbGVuZ3RoOzNDWzAuMskUdmVsO8ZkbWF4xg8xxhB4OzJKW8k+ecQ5McYMeHN0YWNrOy46yTTHJNcYZHJhd2JyYW5jaOQAvWRpcjvmAMFkZWx0YXg7KugAmzBu5gC5JzPFNsQeecseb8webmV4dHg7K1t4O8ZGxmrEFnk7LVt5xhZ5JzI7NFZbeDt5O8YwxSBdOy7pAMTmAPJ4xRPnAL/GE3ldO+QBA8U3xAvGQsUWxiErxwjkARToAXErxwgq5wGcZGlyJzPFMuUAwukAy+QBrCcyOz9bPMdF6AEwXeQBGuoBL1sxXTvLDi0xxU7GZC3ebDrPbOgAty3tALd4Oy7tAQrFFXk7Lu0BDCc17ACFMF07M3lbJzQ=



## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIxaCJdWzVlXTvEFzVOIjsiNUkiOyIzeMQKxCY2asQrxAozQyI7IjRSxDV6IjsiN2nECkHEFHbEKGXEBUIiXVszSsZOM2QiXVsxaMYNMFkiOyIwSSJdWzJuXTs1TlszMDA7xAQtPlsuLls6PVthcnI7LjpbJzI7Oj1bc3Ryb2tlc8sRaGFkb3fIETNkWzE2xDtpOzBZxTp8Pls3aVsySlswLjVdOzNDxggrWzEwOypbaTsxMCcyzQ4zO3w2QlvEDTAuNScyO3w2ZVsqWzAuMDI7acQPc2V0ME1bImdvbGQiXTt8NFJbJzXPd+gApN9733vGey1bMTvFfzE7acQhNUlbIiNlNmI2NzPEf25vME3oAIHlATPmAIHnART/AIH/AIHrAPwz7QD8eWVsbG936gD+MXpbNsV9ZnJhbWU7ZGVsdGE7Li5bMEnlAYItPltsZWFmO2k7Lj3GCiJyb3RhdGlvbiI7K1su0BRd5QCPMC4wMDEnNTswSekBUN9J30nESecBGN9J3Uk4OzFBWyc0Ow==

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMVMiOyIyTyJdWzVlXTvEFyoiXVswYsYMNkkiXVsxU8cNRyJdWzJPXTs3RFtdO3w+Wzo9W2NvbnRhaW5lcjs3Y1snMjt8N0xbfD5bNVHEIjVoWyJzYXkgaGVsbG8iXTt8NEJbIiDSAWJvcmRlcjogZGFzaGVkIDFweCBvcmFuZ2U71C1hY2tncm91bmQ6IHRyYW5zcGFyZW501Ctjb2xvcjogY3lhbtUfdXJzxCBwb2ludGVy1CNwYWRkaW5nOiAxMHB41CHkANY2SVstPls3TOsBDXw+WzdkWyJI5AD5IecA+itbIuYAkSI7NkdbJzEw
