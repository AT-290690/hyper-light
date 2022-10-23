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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjF2IjsiM0oiXVs1ZV07xBI1TiI7IjRWxBd5IjsiMkrECkMiXVszSsYhMG8iOyIwbiI7IlBJIl1bMXZdOzVOWzo9W2gwOzUwMF07Oj1bbscLLT5bLi7EHGcwOzAuOMUcYsQLN8ULZjA7KltQSTswLjUnMsQRMlU7M0NbMC4yxxBlMDvGUW8wOzHGCng7MkpbyTF5xDAxxgxsMDsuOltvMMYOa80OcDDkAIxhMDvmAI9qxHkyVTswbltmMCczxCJpyBNvyRNkMDsrW3g7asdEYzA7LVt5O2nEDzRWW3g7eTtkMDtjMF07LsV9ZTA7eMUMa8UMeV075ACuZDDECHnFKOUA0SvEBeQAs+UBACvEBSrkASBhxHblAQPlAIhixGc/WzzELm/EZC5bcDBbMV07cDBbLTHFK2bkAJHSPzrJP8VwLcpweDsu5gCpxQ55Oy7mAKsnNcRVMF07M3lbJzQ=

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIxaCJdWzVlXTvEFzVOIjsiNUkiOyIzeMQKxCY2a8QrxAozQyI7IjRSxDV6IjsiN2rECkHEFHbEKGbEBUMiXVszSsZOM2QiXVsxaMYNMFkiOyIwSSJdWzJuXTs1TlszMDA7xAQtPlsuLls6PVthMDsuOlsnMjs6PVtlywxkyAwzZFsxNsQwaTswWcQvfD5bN2pbMkpbMC41XTszQ8YIK1sxMDsqW2k7MTAnMs0OMzt8NkNbxA0wLjUnMjt8NmZbKlswLjAyO2nEDzR2WyJjcmltc29uIl07fDRSWyc1z3Zl33bfdsh2LVsxO8V6MTtpxCE1SVsiZGFya3JlZMR6M3jIeuUBIMV6ZN9633rtAPAz6gDwYmxhY2vqAO4xels2xXRjMDtkZWx0YTsuLlswSeQBbi0+W2IwO2k7Lj3ECCJyb3RhdGlvbiI7K1suzhJd5QCBMC4wMDEnNTswSeQBNt8+3D5k3z7ZPjg7MUFbJzQ7

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMVMiOyIyTyJdWzVlXTvEFyoiXVswYsYMNkoiXVsxU8cNSCJdWzJPXTs3RVtdO3w+Wzo9W2EwOzdkWycyO3w3TVt8Pls1UcQbNWhbInNheSBoZWxsbyJdO3w0QlsiINIBYm9yZGVyOiBkYXNoZWQgMXB4IG9yYW5nZTvTLTZrOiB0cmFuc3BhcmVudNQjY29sb3I6IGN5YW7VH3Vyc8QgcG9pbnRlctQjcGFkZGluZzogMTBweNQh5ADONkpbLT5bN03kAP58Pls3ZVsiSOQA6iHnAOt+WyLmAIoiOzZIWycxMA==

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIzdyI7IjF2Il1bNWVdO8QcNU4iOyI1xCE3asQhecQhQcQFesQUxAo2a8Q/xCMzQ8QPRCI7IjR2xDdJxBR4xA9SIl1bM0rGUzBZxBJhIl1bMm7GEjJmxB93x3J5Il1bMXZdOzo9W047NTDFCW0wOzAuMjXFDHI7KltOO20wJzLEDmg7KltyO20wOy0xxhFsMDsuOlsiYmxhY+QAmWNyaW1zb24ixh1nMDtOxUVmyAlqxS/GHnAwOy0+W3g7eTsuxBgrW3g7KsQqeSc1xB9zxR/EMS5bOj1beTA7NUrEOn49WzFmxBtpMDtrxR4/WyFbJcQPZ+QApuQApStbaDtyJzPER28wOzV5WzA75wCwd84PZDA7fD5bN2pbJVsqxEJyXeUA4cVJaDtyxBB8NHZbLuQA6G/EFXw0UlvGWWMwOzo6WyJzdGF0ZSLFC2FsaXZlIjtvMDsiMWciO3cwXTsicmVuZGVyIjtkxD03QeQAx2QwXTswWeQA2mMwXTs/Wz5bazA7aTBdOzFmWz3kAIUrxAXkAKFrMCc1xBYwOy1b5QEbZ8QmJzI7eTDmAIR46AEkY2FsbGJhY2voAS07LTFdOzRhxBstPuQAq2k75gFKxBw/5AEuO2YwXTt5O8QQK1t5OzEnNMVRO8Qb5QD/5gDjcDDkAaInMslixBXEEjfEIXXlAc/kAPx4IjswOyJ5IjsxXeUBDHgiOzHFEOQCUsYQLdARxjHkAKrNMssRxzPRI9EiMeYBEHLqAlPlAQgwa8RvMmbkAKktPlth6AJN5gDZ5AJyLsQVInjkArHkAQfGD3kiJzQ7xT4rxAU/xDAuxAXoAe7nAetdOzAnNjswa8Z9dsZ9MOoBdeoAiW/WQeYBZ3QwO3LoAWc/WyYmxC48xBYyJzI7LuUArsk45AJZ5QI2xic+xCcz3ichW28wXTs9xWjXKzEnOeQAiW7lALloMDt2YWx1ZeoCVeYDYcgY7AIN5gI25gLl/wD+9QD+5QNcxBrGQyJdO+oDa+8AqMY0z0kxZyLmAopxMDsxMDAwXTs1TlsxMzAwOzUw5QCI6QQ9fOUDKHxzMFtdO3w2RFsxNTsxNSczOzF6xDzmAPdmcHM7bjDECjjHPHbEL+YAnFsnNjsxQeQA8g==
