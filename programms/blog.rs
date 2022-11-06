<- ["DOM"; "STYLE"; "EVENT"] [LIBRARY]; <- ["makeuserinterface"; "makeelement"; "makeiframe"; "makecontainer"; "makebutton"; "insertintocontainer";  "makelabel"; "removeselffromcontainer"; "makeinput"; "makepre"; "makeorderedlist"; "makelist"; "makeunorderedlist"; "makeanchor"; "setid"; "makespan"; "setstyle"; "makeparagraph"; "getbody"; "setattribute"; "makeheadertag"; "getelementsbyclassname"; "getparentnode"; "makecheckbox"; "makeitalictext"] [DOM]; <- ["displayhide"; "displayshow"; "fontfamily"; "textcolor"; "textalign"; "fontsize"; "resetcss"; "makestyle"] [STYLE];

:= [section; -> [title; content; :: ["t"; title; "c"; content]]];
:= [sections; .: [
            section [
             "Introduction"; .: [
             "Arrays are slow.";
             "They have fast operations at the end. But very slow operations at the start.";
             ]];
            section [
             "Implementation"; .: [
             "TODO";
             ]];
            section [
             "API"; .: [
             "TODO";
             ]];
            section [
             "Test"; .: [
             "TODO";
             ]];
            ]];
:= [color main; "white"];

:= [end with new line; -> [texts; .. [
          := [output; ""]; 
          >> [texts; -> [x; i; a; = [output; ~ [output; x; "\n"]]]]; 
          output]]];
:= [link to section; -> [index; ~ ["#"; . [sections; index; "t"]]]];
:= [list; -> [index; |> [make list [
    make anchor [
    . [sections; index; "t"]; 
    link to section [index]]]; 
    | set style [text color [color main]]]]];

:= [make editor; -> [gist; |> [make iframe [~ ["https://at-290690.github.io/YavaScript/"; gist]]; 
                               | set style ["width:100%;height:500px;border:1px solid #6b84b0;background:transparent"]]]];
:= [make gist; -> [str; ~ ["?g="; "AT-290690/"; str]]];
make user interface [];
make style [.: ["a";"text-decoration: none"; text color ["#546a90"]]; 
            .: ["a:hover"; text color [color main]]];
set style [get body []; font family ["Courier New"]];
|> [make container [
  
    ;; header
    |> [make container [ 
      |> [make header tag ["Binary Array"; 2]; 
          | set style [
            text color[color main]]];
      |> [make italic text ["Implementing an array-like data structure with fast operations."];
          | set style [
            ~ [
                text color [color main];
                font size [14];
            ]]]]; 
    | set style [text align ["c"]]];
    make unordered list [list [0]; 
                         list [1];
                         list [2];
                         list [3];
                        ];
   ;; introduction
   make container [
      |> [make header tag [. [sections; 0; "t"]; 3]; 
          | set id [. [sections; 0; "t"]];
          | set style [
            text color[color main];
            ]];
      |> [
        make pre [
        end with new line [. [sections; 0; "c"]]]; 
        | set style [text color [color main]]];
        make editor [""];
      ];
   ;; Implementation
   make container [
      |> [make header tag [. [sections; 1; "t"]; 3];
          | set id [. [sections; 1; "t"]];
          | set style [
            text color[color main];
            ]];
      |> [
        make pre [
        end with new line [. [sections; 1; "c"]]]; 
        | set style [text color [color main]]];
   make editor [make gist ["9021bc9afd9420cb44d4db652cbff59c/raw/3d06b922ce44bfd77f952623c8a93112c03239ea/BinaryArray.js"]]
   ];
   ;; API
   make container [
      |> [make header tag [. [sections; 2; "t"]; 3]; 
          | set id [. [sections; 2; "t"]];
          | set style [
            text color[color main];
            ]];
      |> [
        make pre [
        end with new line [. [sections; 2; "c"]]]; 
        | set style [text color [color main]]];
     make editor [""]];
    ;; TEST
   make container [
      |> [make header tag [. [sections; 3; "t"]; 3]; 
          | set id [. [sections; 3; "t"]];
          | set style [
            text color[color main];
            ]];
      |> [
        make pre [
        end with new line [. [sections; 3; "c"]]];
        | set style [text color [color main]]];
      make editor [""]];
  make paragraph [];
  ;; footer
 |> [make container [|> [make italic text [
        end with new line [.: [
            "* This page is compressed within the link using Hyper Light"
        ]]]; | set style [~ [text color [color main]; font size [13]]]]]; 
     | set style [ text align ["c"]]]
]];
      
