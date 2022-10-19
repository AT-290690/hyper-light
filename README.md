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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjF2IjsiM0oiXVs1ZV07xBI1TiI7IjRWxBd5IjsiMkrECkMiXVszSsYhMG8iOyIwbiI7IlBJIl1bMXZdOzVOWzo9W2cwOzUwMF07Oj1bbccLLT5bLi7EHGYwOzAuOMUcYcQLN8ULZTA7KltQSTswLjUnMsQRMlU7M0NbMC4yxxBkMDvGUW4wOzHGCng7MkpbyTF5xDAxxgxrMDsuOltuMMYOas0ObzDkAIxkaXI75gCQacR6MlU7MG5bZTAnM8QjaMgTb8kTYzA7K1t4O2nHRWIwOy1beTtoxA80Vlt4O3k7YzA7YjBdOy7FfmQwO3jFDGrFDHldO+QAr2MwxAh5xSjlANIrxAXkALTlAQErxAUq5AEhZGlyJzM75QEF5QCJYcRoP1s8xC9uxGUuW28wWzFdO28wWy0xxStl5ACS00A6yUDFci3Kcng7LuYAq8UOeTsu5gCtJzXEVjBdOzN5Wyc0

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIxaCJdWzVlXTvEFzVOIjsiNUkiOyIzeMQKxCY2a8QrxAozQyI7IjRSxDV6IjsiN2rECkHEFHbEKGbEBUMiXVszSsZOM2QiXVsxaMYNMFkiOyIwSSJdWzJuXTs1TlszMDA7xAQtPlsuLls6PVthcnI7LjpbJzI7Oj1bZDDKDGPIDDNkWzE2xDFpOzBZxTB8Pls3alsySlswLjVdOzNDxggrWzEwOypbaTsxMCcyzQ4zO3w2Q1vEDTAuNScyO3w2ZlsqWzAuMDI7acQPNHZbImNyaW1zb24iXTt8NFJbJzXPd2Qw33bfdsd2LVsxO8V6MTtpxCE1SVsiZGFya3JlZMR6M3jIeuUBIsV6Y99633rtAPAz6gDwYmxhY2vqAO4xels2xXRiMDtkZWx0YTsuLlswSeUBby0+W2EwO2k7Lj3ECCJyb3RhdGlvbiI7K1suzhJd5QCCMC4wMDEnNTswSeQBN98+3D5j3z7ZPjg7MUFbJzQ7

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMVMiOyIyTyJdWzVlXTvEFyoiXVswYsYMNkoiXVsxU8cNSCJdWzJPXTs3RVtdO3w+Wzo9W2EwOzdkWycyO3w3TVt8Pls1UcQbNWhbInNheSBoZWxsbyJdO3w0QlsiINIBYm9yZGVyOiBkYXNoZWQgMXB4IG9yYW5nZTvTLTZrOiB0cmFuc3BhcmVudNQjY29sb3I6IGN5YW7VH3Vyc8QgcG9pbnRlctQjcGFkZGluZzogMTBweNQh5ADONkpbLT5bN03kAP58Pls3ZVsiSOQA6iHnAOt+WyLmAIoiOzZIWycxMA==

game of life: https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIzdyI7IjF2Il1bNWVdO8QcNU4iOyI1xCE3asQhecQhQcQFesQUxAo2a8Q/xCMzQ8QPRCI7IjR2xDdJxBR4xA9SIl1bM0rGUzBZxBJhIl1bMm7GEjJmxB93x3J5Il1bMXZdOzo9W047NTDFCWswOzAuMjXFDHI7KltOO2swJzLEDmg7KltyO2swOy0xxhFqMDsuOlsiYmxhY+QAmWNyaW1zb24ixh1lMDtOxUVkyAloxS/GHm4wOy0+W3g7eTsuxBgrW3g7KsQqeSc1xB9xxR/EMS5bOj1bdzA7NUrEOn49WzFmxBtnMDtpxR4/WyFbJcQPZeQApuQApStbaDtyJzPER20wOzV5WzA75wCwdc4PYjA7fD5bN2pbJVsqxEJyXeUA4cVJaDtyxBB8NHZbLuQA6G3EFXw0UlvGWWEwOzo6WyJzdGF0ZSLFC2FsaXZlIjttMDsiMWciO3UwXTsicmVuZGVyIjtixD03QeQAx2IwXTswWeQA2mEwXTs/Wz5baTA7ZzBdOzFmWz3kAIUrxAXkAKFpMCc1xBYwOy1b5QEbZcQmJzI7dzDmAIR26AEkY2FsbGJhY2vnAS15Oy0xXTs0YcQbLT7kAKtpO+YBSsQcP1slW2k7ZDBdO3k7xBArW3k7MSc0xFF4O8Qb5QD/5gDjbjDkAaInMslixBXEEjfEIXPlAc/kAPx4IjswOyJ5IjsxXeUBDHgiOzHFEOQCUsYQLdARxjHkAKrNMssRxzPRI9EiMeYBEHDqAlPlAQgwa8RvMmbkAKktPltkaXLHGeYA2uQCcy7FFiJ45AKz5AEJxxB5Iic0O8VBK8QFP8QyLsQF6AHx5wHuXTswJzY7MGvmAIB0xWd2MOoBeOoAjG3WQeYBanIwO3DoAWo/WyYmxC48xBYyJzI7LuUAsMk45AJc5QI5xic+xCcz3ichW20wXTs9xWjXKzEnOeQAiWzlALlmMDt2YWx1ZeoCWOYDZMgY7AIQ5gI55gLo/wD+9QD+5QNfxBrGQyJdO+oDbu8AqMY0z0kxZyLmAo1vMDsxMDAwXTs1TlsxMzAwOzUw5QCI6QRAfOUDK3xxMFtdO3w2RFsxNTsxNSczOzF6xDzmAPdmcHM7bDDECjjHPHTEL+YAnFsnNjsxQeQA8g==
