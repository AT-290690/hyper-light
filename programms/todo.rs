<- ["DOM"; "COLOR"; "DATE"; "STYLE"; "EVENT"; "CONVERT"; "STRING"; "ARRAY"; "CONSOLE"] [LIBRARY];
<- ["makeuserinterface"; "makecontainer"; "makebutton"; "insertintocontainer"; 
"makelabel"; "removeselffromcontainer"; "makeinput"; 
"makespan"; "setstyle"; "makeparagraph"; "getbody"; "setattribute";
 "getelementsbyclassname"; "getparentnode"; "makecheckbox"] [DOM];
<- ["displayhide"; "displayshow"] [STYLE];
<- ["makenewdate"; "formattolocal"] [DATE];
<- ["onmouseclick"; "onkeyup"] [EVENT];
<- ["array"] [CONVERT];
<- ["forof"] [ARRAY];
<- ["includes"] [STRING];

make user interface [];
set style [get body []; "font-family: Courier New"];

:= [Item; -> [value;
:= [container; 
|> [insert into container [
  make container []; 
  insert into container [
    |> [make container[]; 
      set style ["
        display: flex; 
        justify-content: space-between;
        align-content: flex-start;
      "]]; 
  |> [make span [
    |> [make new date []; 
      format to local ["en-GB"]]
    ];
  set style ["color: white"]];
  |> [make button [];
    make label ["x"];
    set style ["
        border-radius: 8px;
        color: white; 
        cursor: pointer;
        background: transparent; 
        border: none
      "];
    on mouse click [-> [remove self from container [container]]]]];
    make checkbox [];
  |> [make span [value];
    set style ["
          color: white; 
          word-wrap: break-word;       
          "];
    set attribute ["class"; "todo"]]];
  set style ["
     border: solid 1px white;
     border-radius: 16px;
     padding: 10px;
  "]]]]];

|> [
  := [main; 
  |> [make container []; 
      set style ["width: 90%"]]];
  insert into container [
    |> [:= [todo input; 
      |> [make input []; 
           set style ["
            font-famity: Courier New;
            width: 80%;
            color: white;
            background: transparent;
            border: white 1px solid;
            border-radius: 8px;
           "];
           on key up [-> [e; ..[
              <- ["key"; "target"] [e];
              ? [== [key; "Enter"]; 
                for of [array [get elements by class name ["todo"]]; -> [
                  element; 
                  ? [includes [. [element; "textContent"]; . [target; "value"]];
                     display show [
                      |> [element; 
                          get parent node []]];     
                     display hide [
                      |> [element; 
                          get parent node []]]]]];
              ? [== [key; "Escape"];  
                  for of [array [get elements by class name ["todo"]]; 
                  -> [element;  display show [get parent node [element]]]]]]]]]]]];
    |> [make button [];
        make label ["+"];
        set style ["
          margin-left: 10px;
          border-radius: 50px;
          color: white;
          background: transparent;
          cursor: pointer;
          border: solid 1px white;
        "];
      on mouse click [-> [
        ? [. [todo input; "value"]; .. [
        insert into container [main; 
        Item [. [todo input; "value"]];
        make paragraph []]; 
        .= [todo input; "value"; ""]]]]]];
      make paragraph []]];