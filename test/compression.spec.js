import { compress } from '../language/misc/compression'

describe('compression', () => {
  it('simple compression should work', () => {
    const raw = `:= [mult two numbers; -> [left; right; * [left; right]]];
    mult two numbers [2;
      mult two numbers [2; 
        mult two numbers [2; 
          mult two numbers [2; 
            mult two numbers [2; 
              mult two numbers [2; 
                mult two numbers [2; 
                  mult two numbers [2; 
                    mult two numbers [2;
                      mult two numbers [2;
                        mult two numbers [2;
                          mult two numbers [2; 2]]]]]]]]]]]]`
    expect(compress(raw)).toBe(
      ":=[c0;->[a0;b0;*[a0;b0'3;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;2'12"
    )
    expect(raw.length > compress(raw).length).toBe(true)

    expect(
      compress(`<- ["SKETCH"; "ARRAY"; "LOOP"] [LIBRARY];
    <- ["makescene"; "setstroke"; "nofill";
        "makegroup"; "background"; 
        "width"; "height"; "nostroke"; 
        "draw"; "makerectangle"; "play"; 
        "setfill"; "setopacity"; "setrotation"] [SKETCH];
    <- ["repeat"] [LOOP];
    <- ["push"; "each"] [ARRAY];
    
    make scene [300; 300; -> [.. [
    
    := [arr; .: []];
    := [strokes; .: []];
    := [shadows; .: []];
    
    repeat [16; -> [i; push [arr; |> [
      make rectangle [width [0.5]; height [0.5]; + [10; * [i; 10]]; + [10; * [i; 10]]]; 
      | set rotation [* [i; 0.5]]; 
      | set opacity [* [0.02; i]]; 
      | set fill ["gold"]; 
      | no stroke []]]]];
    
    repeat [16; -> [i; push [strokes; |> [
      make rectangle [width [0.5]; height [0.5]; + [10; * [i; 10]]; + [10; * [i; 10]]]; 
      | set rotation [* [i; 0.5]]; 
      | set opacity [- [1; * [0.01; i]]]; 
      | set stroke ["#e6b673"]; 
      | no fill []]]]];
    
    repeat [10; -> [i; push [shadows; |> [
      make rectangle [width [0.5]; height [0.5]; + [10; * [i; 10]]; + [10; * [i; 10]]]; 
      | set rotation [* [i; 0.5]]; 
      | set opacity [* [0.03; i]]; 
      | set fill ["yellow"]; 
      | no stroke []]]]];
    
    draw [60; -> [frame; delta; .. [
      each [arr; 
            -> [leaf; i; .= [leaf;  "rotation"; 
            + [.[leaf; "rotation"]; * [i; 0.001]]]]];
      each [strokes; 
            -> [leaf; i; .= [leaf;  "rotation"; 
            + [.[leaf; "rotation"]; * [i; 0.001]]]]];
      each [shadows; 
            -> [leaf; i; .= [leaf;  "rotation"; 
            + [.[leaf; "rotation"]; * [i; 0.001]]]]]]]];
    play []]]];`)
    ).toBe(
      `<-["3p";"2b";"0Z"][4f];<-["5t";"5o";"3d";"5p";"5R";"2w";"3i";"4y";"1q";"6U";"1r";"4a";"5M";"6n"][3p];<-["2M"][0Z];<-["0N";"0R"][2b];5t[300;300;->[..[:=[b0;.:[]];:=[g0;.:[]];:=[f0;.:[]];2M[16;->[a0;0N[b0;|>[6U[2w[0.5];3i[0.5];+[10;*[a0;10]];+[10;*[a0;10'3;|6n[*[a0;0.5]];|5M[*[0.02;a0]];|4a["gold"];|4y['5;2M[16;->[a0;0N[g0;|>[6U[2w[0.5];3i[0.5];+[10;*[a0;10]];+[10;*[a0;10'3;|6n[*[a0;0.5]];|5M[-[1;*[0.01;a0'3;|5o["#e6b673"];|3d['5;2M[10;->[a0;0N[f0;|>[6U[2w[0.5];3i[0.5];+[10;*[a0;10]];+[10;*[a0;10'3;|6n[*[a0;0.5]];|5M[*[0.03;a0]];|4a["yellow"];|4y['5;1q[60;->[e0;d0;..[0R[b0;->[c0;a0;.=[c0;"4g";+[.[c0;"4g"];*[a0;0.001'5;0R[g0;->[c0;a0;.=[c0;"4g";+[.[c0;"4g"];*[a0;0.001'5;0R[f0;->[c0;a0;.=[c0;"4g";+[.[c0;"4g"];*[a0;0.001'8;1r['4;`
    )

    expect(
      compress(`
            |  ;;  What a waste of space...
            >  ;; do you even care?
        [3; |  ;; It's not a waste 
    + [10]; |  ;; space doesn't matter                
  - [4; 2]; |  ;; express yourself
* [3; 1.2]; | + [1; 2; 3; 4; 5; 6; 7]];
`)
    ).toBe(`|>[3;|+[10];|-[4;2];|*[3;1.2];|+[1;2;3;4;5;6;7]];`)
  })
})
