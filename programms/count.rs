<- ["DOM"; "STYLE"; "EVENT"; "COLOR"][LIBRARY];
<- ["makeuserinterface"; "makebutton";"makelabel";"makelist";"settextcontent";
    "setstyle";"makecontainer"] [DOM];
<- ["makestyle";
    "backgroundcolor"; "border"; "margin"; "padding"; "unitspixel";
    "displayhide";"textcolor";"textalign";"makeclass";"makesvgstyle";"styleoption"; "cursorpointer"] [STYLE];
<- ["oninputchange";"onmouseclick";"onkeydown";"onkeyup"] [EVENT];
<- ["makergbcolor"] [COLOR];

# [size; type; color; left; right; top; bottom];
:= [primary foreground color; make rgb color [250; 122; 123]];
:= [primary background color; make rgb color [100; 32; 11]];

make user interface [];
:= [count; 0];
make container [
  |> [:= [butt; make button []]; 
      | make label [count];
      | set style [
            cursor pointer [];
            text color [primary foreground color];
            background color [primary background color];
            border [:: [size; units pixel [3]; 
                        type; "solid"; 
                        color; primary foreground color]];
            margin [:: [left; units pixel [6]]];
            padding [:: [left; units pixel [10];
                         right; units pixel [13];
                         top; units pixel [19];
                         bottom; units pixel [39]]]];
      | on mouse click [-> [e; 
           set text content [butt; = [count; + [count; 1]]]]]]];
