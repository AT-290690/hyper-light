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
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjFsIjsiM2wiXVszWl07xBI1cyI7IjR5xBdhIjsiMnXECmXEIWzGITBtIjsiMMQ4YzAiXVsxbF07NXNbOj1bbDA7NTAwXTs6PVtyxwstPlsuLsQcazA7MC44xRxlxAs3xQtqMDsqW2PEEDVdxRFxMDszZVswLjLHEGkwO8ZRdTA7McYKYjA7MnVbyTJhxTIxxg1wMDsuOlt1MMYOb80OdjDkAI5kMDvmAJFuxHtxMDswbFtqMCczxCJtyBNtyRNoMDsrxHJux0VnMDstxHNtxBA0ecQbYTA7aDA7ZzBdOy7lAIFpMDtixg1vxQ1hMF075QC2aMUJYcYs5QDbK8QF5AC75QEKK8QFKuQBKmTEfuUBDeUAkGXEbT9bPMQudcRbLlt2MFsxXTt2MFstMcUrauQAmNI%2FOsk%2FxXAtynBiMDsu5gCuxQ9hxA%2FlALAnNcRXMF07M2FbJzQ%3D

## Web Code Editor:

https://at-290690.github.io/hyper-light/index.html

## Excercises:

https://at-290690.github.io/hyper-light/learn.html

## More examples

animations are also supported:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNsIjsiMVoiOyIwWSJdWzNaXTvEFzVzIjsiNW4iOyIyxBw1b8QFVCI7IjbFFHUiOyIzZSI7IjR2xD9wxBlYxApxxBlVxC1PxBRwxFNsxlMySSJdWzBZxg0wTcRyUSJdWzFaXTs1c1szMDA7xAQtPlsuLls6PVtjMDsuOltdXTs6PVtrywxqyAwySVsxNsQwYTA7ME3EMHw%2BWzZYWzJ1WzAuNV07M2XGCCtbMTA7KsQmMTBdzg8nMzt8NnBbxQ7ELF07fDVPWypbMC4wMjthxC58M1VbImNyaW1zb24iXTt8NHZbJzXQe2vfe997y3stWzE7xX8xO2HFIzVuWyJkYXJrcmVkxH8yWsh%2F5QEqxn9q33%2Fff8t%2FxXsz6wD6YmxhY2vqAPgxcFs2xXlnMDtmMDsuLlswUeQBeS0%2BW2QwO2EwOzZwxAkrWzZuW2QwXcZtMC4wMDEnNTswUeQBKd8ryStq3yvGKzg7MXFbJzQ7

user interface:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjBhIjsiMUgiOyIyeiJdWzNaXTvEFyoiXVswYcYMNnciXVsxSMcNdSJdWzJ6XTttYWtldXNlcmludGVyZmFjZVtdO3w%2BWzo9W2YwxR1jb250YWluZXJbXV07fGluc2VydGludG%2FKGHw%2BW8QpYnV0dG9uxD%2FEDmxhYmVsWyJzYXkgaGVsbG8iXTt8c2V0c3R5bGVbIiDSAWJvcmRlcjogZGFzaGVkIDFweCBvcmFuZ2U71C1hY2tncm91bmQ6IHRyYW5zcGFyZW501Ctjb2xvcjogY3lhbtUfdXJzxCBwb%2BUBAtQjcGFkZGluZzogMTBweNQh5ADcNndbLT5b9AEfZjDkAVHkARRwYXJhZ3JhcGhbIkjkARQh7QEVflsi5gCsIjs2dVsnMTA%3D

game of life:
https://at-290690.github.io/hyper-light/preview.html?s=PC1bIjNsIjsiMVoiOyIyWcQKbCJdWzNaXTvEHDVzIjsiNW8iOyI2WCI7IjNhxCFxxAVwIjsiN3LEHlTEOnXEHmXEKMQeM1XEGW7EGcRYNHbEU2zGUzBNxCF5Il1bMcdlMnIiXVsyWcdyZMQabF07I1tCMDtwMDt3MDt2MF07Oj1bZjA7NcYKQTA7MC4yNcUMZTA7KsQbQTBdxRBkxBBlxBA7LTHGE3owOy46WyJibGFjayI7ImNyaW1zb24ixh1vMDtmxlZuyQp1xTHGIEcwOy0%2BW2MwO2IwOy7EGivEDSrELmIwJzXEI0zFI8Q1Lls6PVtTMDs1b8Q%2Bfj1bbcUbdDA7ecUeP1shWyXED2%2FkAK7lAK0rxAVlMCczxEpGMDs1ZFswO%2BcAuVDOD2wwO3w%2BWzZYWyVbKsRFZTBd5gDsxU7FR8UUfDNVWy7kAPZGxBh8NHZbxl5rMDs6Olt2xQZ3xB7kAWBQMF07QjA7bMQrN3LkAL1sMF07ME3kANBrMF07P1s%2BW3kwO3QwXTttMFs9xHgrxAXkAJR55AEBbTBbMDstW%2BUBEm8wXcUZU%2BcA0FLoARpL6AEdYuUBlzszecQWLT7kAJRhMDvmATzFHj9bJVthMDtuMF3kAXLFEyvEBTEnNMRSYzA7xSDlAPPmANRHMMQWYsQRSzDEEcUOJzfEH07lAco6OlsiYzAiOzA7ImIwIjsxXeQBAsUSMcYS5AH3xxIt0hPHN%2BQAuM84zBPIOdMn0yYx5gEhSuwCXuUBIWowxHsycuQAuy0%2BW2nIGOYA6eUCfS7EFsROXV3mARzGEWIwIic0O8VCK8QFP8Q0LsQFduQDR107MCc2O2rnAZpPxV5SMOoBh%2BwAhUbNOeUBaU0wO0rqAWk%2FWyYmxCY8xBgyXV07LuUAonblAlPlAjbGID7EIDPXICFbRjBdOz3FXNAkMSc5xHZF5QCeczA7cuUCROYDQMUP5gHu5gIVQv8Aze4AzeUDHmswO0IwXTvqAyfJfXfKL3DnAkZJMDsxMDAwXTs1c1sxMzDkBIjFacZgU%2BUDl3UwO3xMMFtdO3w2cVsxNTsxNSczOzFwxDzmAMJoMDtFMMQJOMc7T8QuQjBbJzY7MXHkAMo%3D
