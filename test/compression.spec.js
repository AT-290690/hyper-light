import { decodeUrl, encodeUrl } from '../language/misc/compression.js'
import { removeNoCode, wrapInBody } from '../language/misc/helpers.js'

describe('run should work as expected', () => {
  it('definitions', () => {
    const source1 = wrapInBody(
      `<- ["MATH"; "ARRAY"] [UNIVERSE];
      <- ["sum"] [MATH];
      <- ["range"] [ARRAY];
      
      := [NUMBERS; range [1; 100]];
      := [first; . [NUMBERS; 0]];
      := [last; . [NUMBERS; - [. [NUMBERS; "length"]; 1]]];
      := [median; + [first; 
      - [* [last; * [+ [1; last]; 0.5]]; 
          * [first; * [+ [1; first]; 0.5]]]]];
      == [sum [NUMBERS]; median]`
    )

    expect(encodeUrl(source1).length).toBe(188)

    const source2 =
      wrapInBody(`<- ["SKETCH"; "ARRAY"; "OBJECT"; "MATH"] [UNIVERSE]; 
    <- ["makescene"; "makegroup"; "makerectangle"; "update"; "play"; "draw"; 
        "insertintogroup"; "background"; "width"; "height"; "setposition";
        "setfill"; "setstroke"; "nofill"; "nostroke"] [SKETCH]; 
    <- ["push"; "foreach"] [ARRAY]; 
    <- ["forof"] [OBJECT]; 
    <- ["randomint"] [MATH; "roll"];
    
    ;; STATE
    := [N; 50]; 
    := [factor; 0.25]; 
    := [r; * [N; factor]]; 
    := [h; * [r; factor; -1]]; 
    := [COLORS; .: ["black"; "crimson"]];
    := [cols; N]; 
    := [rows; N]; 
    := [cells; .: []]; 
    := [get cell; -> [x; y; . [cells; + [x; * [rows; y]]]]]; 
    
    := [make grid; -> [cells; .. [
    := [cells container; make group []]; 
    
    ~= [loop; -> [count; bounds; .. [
      ? [! [% [count; cols]]; = [h; + [h; r]]]; 
    
      := [is alive; roll random int [0; 1]]; 
      := [next is alive; roll random int [0; 1]]; 
      := [rect; |> [make rectangle [% [* [count; r]; * [r; cols]]; h; r; r]; 
          | set fill [. [COLORS; is alive]];
          | no stroke []]];
      := [cell; :: ["state"; :: ["alive"; is alive; "next"; next is alive]; "render"; rect]]; 
      insert into group [cells container; rect]; 
      push [cells; cell]; 
      ? [> [bounds; count]; loop [= [count; + [count; 1]]; bounds]]]]];
    loop [0; - [* [rows; cols]; 1]]; cells container]]];
    
    := [iterate cells; -> [cells; callback; .. [
    := [y; -1]; 
    for each [cells; -> [cell; i; cells; .. [
      = [y; ? [% [i; rows]; 
      y; = [y; + [y; 1]]]]; 
      := [x; % [i; cols]]; 
      := [cell; get cell [x; y]]; 
      callback [cell; x; y]]]]]]]; 
    
    := [directions; .: [
      :: ["x"; 0; "y"; 1]; 
      :: ["x"; 1; "y"; 0]; 
      :: ["x"; -1; "y"; 0]; 
      :: ["x"; 0; "y"; -1]; 
      :: ["x"; 1; "y"; -1]; 
      :: ["x"; -1; "y"; -1]; 
      :: ["x"; 1; "y"; 1]; 
      :: ["x"; -1; "y"; 1]]]; 
    
    := [adjacent; -> [x; y; .. [
    := [sum; 0]; 
    
    for of [directions; -> [dir; .. [
      <- ["x"; "y"] [dir; "dir"]; 
      := [cell; get cell [+ [x; dirx]; 
      + [y; diry]]]; 
      = [sum; + [sum; ? [cell; . [cell; "state"; "alive"]; 0]]]]]]; sum]]];
    
    := [update state; -> [iterate cells [cells; -> [cell; x; y; .. [
      := [is alive; . [cell; "state"; "alive"]]; 
      := [neighbors; adjacent [x; y]]; 
      ? [&& [isalive; < [neighbors; 2]]; 
        .= [cell; "state"; "next"; 0]; 
          ? [&& [is alive; > [neighbors; 3]]; 
            .= [cell; "state"; "next"; 0]; 
               ? [&& [! [is alive]; 
                 == [neighbors; 3]]; 
      .= [cell; "state"; "next"; 1]]]]]]]]]; 
    
    := [trottle; -> [delta; value; callback; ? [! [% [delta; value]]; callback []]]];
    
    := [render; -> [iterate cells [cells; -> [cell; x; y; .. [
      := [is alive; . [cell; "state"; "alive"]]; 
      set fill [. [cell; "render"]; . [COLORS; is alive]]; 
      .= [cell; "state"; "alive"; . [cell; "state"; "next"]]]]]]]; 
    
    := [lifespan; 1000]; 
    make scene [1300; 500; -> [.. [
      := [cells container; 
      |> [cells; 
        | makegrid []; 
        | set position [15; 15]]]; 
      draw [lifespan; -> [delta; fps; trottle [delta; 8; -> [.. [
        update state []; 
        render []]]]]]; 
      play []]]];`)
    expect(encodeUrl(source2).length).toBe(1240)

    const source3 = wrapInBody(`<- ["MATH"; "SKETCH"] [UNIVERSE];
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
        `)

    expect(encodeUrl(source3).length).toBe(496)
  })
})
