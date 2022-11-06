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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFsIjsiM2wiXVszWl07xBI1cSI7IjR3xBdhIjsiMnXECmXEIWzGITBtIjsiMMQ4UEkiXVsxbF07NXFbOj1bajA7NTAwXTs6PVtwxwstPlsuLsQcaTA7MC44xRxkxAs3xQtoMDsqW1BJOzAuNV3FEW8wOzNlWzAuMscQZzA7xlFxMDsxxgpiMDsydVvJMmHFMjHGDW4wOy46W3Ewxg5tzQ5yMOQAjmMwO%2BYAkWzEe28wOzBsW2gwJzPEImvIE23JE2YwOyvEcmzHRWUwOy3Ec2vEEDR3xBthMDtmMDtlMF07LuUAgWcwO2LGDW3FDWEwXTvlALZmxQlhxizlANsrxAXkALvlAQorxAUq5AEqY8R%2B5QEN5QCQZMRtP1s8xC5xxFsuW3IwWzFdO3IwWy0xxSto5ACY0j86yT%2FFcC3KcGIwOy7mAK7FD2HED%2BUAsCc1xFcwXTszYVsnNA%3D%3D

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNsIjsiMVoiOyIwWSJdWzNaXTvEFzVxIjsiNcQcMsQcNW3EBVLED3UiOyIzZSI7IjR0xDpwIjsiNlXECsQyM8QKNU3EFG3ETmzGTjJJIl1bMFnGDTDEHzBRIl1bMVpdOzVxWzMwMDvEBC0%2BWy4uWzo9W2IwOy46W11dOzo9W2fLDGbIDDJJWzE2xDBhMDswTcQwfD5bNlVbMnVbMC41XTszZcYIK1sxMDsqxCYxMF3ODyczO3w2bVvFDsQsXTt8NU1bKlswLjAyO2HELnwzVVsiY3JpbXNvbiJdO3w0dFsnNdB7Z99733vLey1bMTvFfzE7YcUjNWxbImRhcmtyZWTEfzJayH%2FlASrGf2bff99%2Fy3%2FFezPrAPpibGFja%2BoA%2BDFwWzbFeWUwO2QwOy4uWzBR5AF5LT5bYzA7YTA7Lj3ECSJyb3RhdGlvbiI7K1suzhJd5gCCMC4wMDEnNTswUeQBPt9A3kBm30DbQDg7MXFbJzQ7

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBhIjsiMUgiOyIyeiJdWzNaXTvEFyoiXVswYcYMNnQiXVsxSMcNciJdWzJ6XTttYWtldXNlcmludGVyZmFjZVtdO3w%2BWzo9W2EwxR1jb250YWluZXJbXV07fGluc2VydGludG%2FKGHw%2BW8QpYnV0dG9uxD%2FEDmxhYmVsWyJzYXkgaGVsbG8iXTt8c2V0c3R5bGVbIiDSAWJvcmRlcjogZGFzaGVkIDFweCBvcmFuZ2U71C1hY2tncm91bmQ6IHRyYW5zcGFyZW501Ctjb2xvcjogY3lhbtUfdXJzxCBwb%2BUBAtQjcGFkZGluZzogMTBweNQh5ADcNnRbLT5b9AEfYTDkAVHkARRwYXJhZ3JhcGhbIkjkARQh7QEVflsi5gCsIjs2clsnMTA%3D

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNsIjsiMVoiOyIyWcQKbCJdWzNaXTvEHDVxIjsiNW0iOyI2VSI7IjNhxCHEFDFwIjsiN2%2FEHlLEOnXEHmXEKG7ECsQtNcRYMsRYNHTEU2zGUzBNxCF5Il1bMcdlMnIiXVsyWcdyYsQabF07I1t4MDtuMDt0MDtzMF07Oj1bZTA7NcYKdzA7MC4yNcUMYzA7KsQbdzBdxRBoOyrEFHcwOy0xxhJ2MDsuOlsiYmxhY2siOyJjcmltc29uIsYdbTA7ZcZVbMkKcsUxxiBBMDstPlthMDtkMDsuxBorxA0qxC5kMCc1xCNFxSPENS5bOj1bSzA7NW3EPn49W2vFG3EwO3XFHj9bIVslxA9t5ACt5ACsK1toO2MwJzPESHowOzViWzA75wC3Sc4PajA7fD5bNlVbJVsqxENjMF3mAOrFTMRGxRN8M1VbLuQA83rEF3w0dFvGXWkwOzo6W3PFBnTEHuQBXEkwXTt4MDtqxCs3b%2BQAumowXTswTeQAzWkwXTs%2FWz5bdTA7cTBdO2swWz3EdyvEBeQAk3XkAP5rMFswOy1b5QEPbTBdxRlL5wDPSugBF0ToARpk5QGUOzN5xBYtPuQAlGIwO%2BYBOcUeP1slW2IwO2wwXeQBb8UTK8QFMSc0xFJhMDvFIOUA8uYA1EEwxBZkxBFEMMQRxQ4nN8QfR%2BUBxzo6WyJhMCI7MDsiZDAiOzFd5AECxRIxxhLkAfTHEi3SE8c35AC4zzjME8g50yfTJjHmASFD7AJb5QEhaDDEezJy5AC7LT5bZ8gY5gDp5QJ6LsQWxE5dXeYBHMYRZDAiJzTkAlLkATJo5AFKacQbaeQDPTt05AHVJzY7aOcBmkjFXkow6gGH7ACFes055QFpRjA7Q%2BoBaT9bJibEJjzEGDJdXTsu5QCic%2BUCU%2BUCNsYgPsQgM9cgIVt6MF07PcVc0CQxJznEdnnlAJ5wMDtv5QJE5gM9xQ%2FmAe7mAhV4%2FwDN7gDN5QMeaTA7eDBdO%2BoDJ8l9dMovbucCRkIwOzEwMDBdOzVxWzEzMOQEhMVpxmBL5QOWcjA7fEUwW107fDZuWzE1OzE1JzM7MXDEPOYAwmYwO3kwxAk4xztIxC54MFsnNjsxceQAyg%3D%3D
