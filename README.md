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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjF2IjsiM0oiXVs1ZV07xBI1TiI7IjRWxBd5IjsiMkrECkMiXVszSsYhMG8iOyIwbiI7IlBJIl1bMXZdOzVOWzo9W2dfMDs1MDBdOzo9W23IDC0+Wy4uxB5mXzA7MC44xR5hxQw3xQxlXzA7KltQSTswLjUnMsQSMlU7M0NbMC4yxxBkxC7FLG5fMDsxxgt4OzJKW8kzecQyMcYMa18wOy46xCzGEGrPEG9fMOQAlmRpcjvmAJpp5QCCMlU7MG7kAI4nM8QmaMkVb8oVY18wOytbeDtpyExixExbeTtoxRE0Vlt4O3k7xCZiXzBdOy7mAI3kAMB4xQ7kAIvEDnldO+QAwmPEJeQAvcUu5gDpK8UG5ADL5gEbK8UGKuUBP2RpciczO+UBIeUAm2HFdj9bPMU0bsVzLuQA4FsxXTvEBy0xxTDEQi3WSDrKSOYAgC3rAIB4Oy7oAMHFEHk7LugAwyc1xWEwXTszeVsnNA==

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIxaCJdWzVlXTvEFzVOIjsiNUkiOyIzeMQKxCY2a8QrxAozQyI7IjRSxDV6IjsiN2rECkHEFHbEKGbEBUMiXVszSsZOM2QiXVsxaMYNMFkiOyIwSSJdWzJuXTs1TlszMDA7xAQtPlsuLls6PVthcnI7LjpbJzI7Oj1bZF8wyg1jyQ0zZFsxNsQzaTswWcUyfD5bN2pbMkpbMC41XTszQ8YIK1sxMDsqW2k7MTAnMs0OMzt8NkNbxA0wLjUnMjt8NmZbKlswLjAyO2nEDzR2WyJjcmltc29uIl07fDRSWyc1z3fkAJzfd993xnctWzE7xXsxO2nEITVJWyJkYXJrcmVkxHszeMh75QElxXvkAQrfe9976wDyM+oA8mJsYWNr6gDwMXpbNsV1Yl8wO2RlbHRhOy4uWzBJ5QFyLT5bYV8wO2k7Lj3FCSJyb3RhdGlvbiI7K1suzxNd5QCGMC4wMDEnNTswSeUBPd9C30LkAQTfQtpCODsxQVsnNDs=

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBiIjsiMVMiOyIyTyJdWzVlXTvEFyoiXVswYsYMNkoiXVsxU8cNSCJdWzJPXTs3RVtdO3w+Wzo9W2FfMDs3ZFsnMjt8N01bfD5bNVHEHDVoWyJzYXkgaGVsbG8iXTt8NEJbIiDSAWJvcmRlcjogZGFzaGVkIDFweCBvcmFuZ2U70y02azogdHJhbnNwYXJlbnTUI2NvbG9yOiBjeWFu1R91cnPEIHBvaW50ZXLUI3BhZGRpbmc6IDEwcHjUIeQAzjZKWy0+WzdN5QD/fD5bN2VbIkjkAOsh5wDsflsi5gCLIjs2SFsnMTA=

game of life: https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNKIjsiMm4iOyIzdyI7IjF2Il1bNWVdO8QcNU4iOyI1xCE3asQhecQhQcQFesQUxAo2a8Q/xCMzQ8QPRCI7IjR2xDdJxBR4xA9SIl1bM0rGUzBZxBJhIl1bMm7GEjJmxB93x3J5Il1bTUFUSDsicm9sbCJdOzo9W047NTDFCWhfMDswLjI1xQ1yOypbTjtoXzAnMsUcOypbcsQPOy0xxhJnXzA7LjpbImJsYWPkAKZjcmltc29uIsYeZF8wO07FSWPJCmXGMsYha8RLPlt4O3k7LsUaK1t4OyrFLnknNcQibsYixTYuWzo9W3VfMDs1SsRAfj1bbG9vcMQfY291bnQ7Ym91bmRzxCg/WyFbJccWZOUAvuQAvStbaDtyJzPEV2pfMDvkAP01eVswO+cAzHLTFGJfMDt8Pls3alslWyrHUXJd5QEHxlhoO3LEEXxzZXQwTVsu5QERasUafDRSW8ZtYV8wOzo6WyJzdGF0ZSLFC2FsaXZlIsQqOyIxZyI7cl8wXTsiZl8wIjtixT43QeUA6mLEGDBZ5QEAYcQMP1s+W+cA6OUAjl07MWZbPecAmivHCOQAvcYlJzXEIDA7LeQAvl8w5AC1XcUfdV8w5gCddOoBYWNhbGxiYWNr5wFqeTstMV07Zm9yMEnFHy0+5QDKaTvnAY3EIj9bJVtpO2PEVnk7xBErW3k7MSc0xFp4O8Qc5gEn5wEGa18w5AHtJzLJbMUXxBM3xCRwxFo6W+QBIngiOzA7InkiOzFd5QEyeCI7McUQ5AKnxhAt0BHGMeQAts0yyxHHM9Ej0SIx5gEebesCoeUBFXN1bcRxMmblAKwtPltkaXLEG+QDWeQDieQDXMQTImRpcuYDWugA+OQC22Rpcnhd5QEkZGlyeSczO8ZRK8UGP8UrLsUG6AIs5wIpXTswJzY7c3Vt5gCWccZ7dF8w7AGZ6gCl5AJX1UjmAYpvXzA7bekBij9bJibFMjzFGTInMjsu5gC2yT3kAqLlAnzHKj7FKjPfKiHELF07PcZx2C4xJznkAJRp5wFOZWx0YTt2YWx1ZeoCj+YDzssb7AJA5gJsZv8BEvwBEugDu8Ue5AODXTvsA8jwALXGONBOMWci5gLDbF8wOzEwMDBdOzVOWzEzMDA7NTDlAJHqBL985gNvfG5fMFtdO3w2RFsxNTsxNSczOzF6xUDpAQlmcHM7aV8wxw44x0dxxThmXzBbJzY7MUHkAQM=
