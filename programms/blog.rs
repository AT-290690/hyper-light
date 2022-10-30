<- ["DOM"; "STYLE"; "EVENT"] [LIBRARY];
<- ["makeuserinterface"; "makeelement"; "makeiframe"; "makecontainer"; "makebutton"; "insertintocontainer"; 
"makelabel"; "removeselffromcontainer"; "makeinput"; "makepre";
"makespan"; "setstyle"; "makeparagraph"; "getbody"; "setattribute"; "makeheadertag";
 "getelementsbyclassname"; "getparentnode"; "makecheckbox"; "makeitalictext"] [DOM];
<- ["displayhide"; "displayshow"; "fontfamily"; "textcolor"; "textalign"; "fontsize"] [STYLE];
:= [color main; "white"];
:= [section; -> [title; content; :: ["t"; title; "c"; content]]];
:= [sections; .: [section [
             "Introduction"; .: [
             "Arrays are slow.";
             "They have fast operations at the end";
             "But very slow operations at the start"]]]];

make user interface [];
:= [end with new line; -> [texts; .. [
          := [output; ""]; 
          >> [texts; -> [x; i; a; 
          = [output; ~ [output; x; "\n"]]]]; 
    output]]];
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
   ;; introduction
   make container [
      |> [make header tag [. [sections; 0; "t"]; 3]; 
          | set style [
            text color[color main];
            ]];
      |> [
        make pre [
        end with new line [. [sections; 0; "c"]]]; 
        | set style [text color [color main]]];
      |> [make iframe ["https://at-290690.github.io/YavaScript/"];
        | set style ["width:100%;height:500px;border:1px solid #6b84b0;background:transparent"];
   ]];
  make paragraph [];
  ;; footer
 |> [make container [|> [make italic text [
        end with new line [.: [
            "* This page is compressed within the link using Hyper Light"
        ]]]; | set style [~ [text color [color main]; font size [13]]]]]; 
     | set style [ text align ["c"]]]
]];
      
