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
;; Devision by zero is a run-time error
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

game of life: https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIzdyI7IjF2Il1bNWVdO8QcNU4iOyI1xCE3acQhecQhQcQFesQUxAU2asQ/xCMzQ8QPxAU0dsQ3ScQUeMQPUiJdWzNKxlMwWcQSYSJdWzJuxhIyZsQfd8dyeSJdW01BVEg7InJvbGwiXTs6PVtOOzUwxQlmYWN0b3I7MC4yNcUQcjsqW047xhYnMsQSaDsqW3LHEjstMcYVQ09MT1JTOy46WyJibGFjayI7ImNyaW1zb24ixiFjb2xzO07GU293yAtjZWxsc8Q2xiVnZXTEEjstPlt4O3k7LscgK1t4xHTEN3knNcQpbWFrZWdyaWTEKsdELlvIUGNvbnRhaW5lcjs1SsRZfj1bbG9vcMUsb3VudDtib3VuZMUzP1shWyXHFuQAoicyO+QA4StbaDtyJzPEamlzYWxpdmU75AErNXlbMDvnAPFuZXh02BxyZWN0O3w+WzdpWyVbKsdfcl3lATjHZmg7csQSfHNldDBNWy7oAUDHUicyO3w0UlvmAILlARI6Olsic3RhdGUixQvFJiLILzsiMWciO+sAkl07InJlbmRlciI75ACMJzI7N3rwARzEGV07MFnGGDvEBl07P1s+W+cBHuUAtl07MWZb5AG95ADCK8cI5ADmxiUnNcQgMDstW+cBn+QA3l3FIc5u5wFMdGVyYXRlxnHpAbpjYWxsYmFja+cBw3k7LTFdO2ZvcjBJxyHHKjtpxlXEKMQnP1slW2k7xHddO3k7xBIrW3k7MSc0xGt4O8Qd5wFt6AFF5wJf5AJc5ACix3jGHMQUN8QqZGnkARppb27lApjkAW14IjswOyJ5IjsxXeUBfXgiOzHFEOQDMsYQLdARxjHkAMrNMssRxzPRI9EiMeYBPWFkamFjZW506QMd5QEuc3VtxHYyZuwAuC0+xA7EIuQD8OQEIOQD88QTImRpcuYD8e0BEeQDYWRpcnhd5QFDZGlyeSczO8ZdK8UGP8Yw5gORO+gCiucCh107MCc2O3N1beYAqXVwZGF0ZcUj5ACK7AH17wHR6gDH6ALJ1mHoA3JpZ2hib3JzO+gBC+cByT9bJibJQjzLKDInMjsu5wDryVPkAysw5ALqyzU+yzUz3zVbIcg3XTs97ACW2TkxJznkAMB0cm90dGzlARRkZWx0YTt2YWx1ZeoC/+YEjMsb7AKk5gLW5gPV/wFW/wFW7AFW6AR+xh/GXiJdO/MEj/EA2cZE0VsxZyLmA0dsaWZlc3BhbjsxMDAwXTs1TlsxMzAwOzUwMOQAqfUFrnzoBBJ86AXfW107fDZDWzE1OzE1JzM7MXrKV+kBRmZwczvnAVvHEjjHYusCiVtdO+YA3lsnNjsxQeQBTw==
