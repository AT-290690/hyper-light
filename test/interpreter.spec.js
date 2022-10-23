import { runFromText } from '../language/misc/utils.js'
describe('run should work as expected', () => {
  it('definitions', () => {
    expect(
      runFromText(
        `:= [x; 10]; := [y; 3]; := [temp; x]; = [x; y]; = [y; temp]; :: ["x"; x; "y"; y]`
      )
    ).toEqual({ x: 3, y: 10 })
    expect(() => runFromText(`: [29; 0]`)).toThrow(RangeError)
  })

  it('simple math', () => {
    expect(
      runFromText(
        `:= [x; 30]; := [result; + [: [* [+ [1; 2; 3]; 2]; % [4; 3]]; x]];`
      )
    ).toBe(42)
    expect(() => runFromText(`: [29; 0]`)).toThrow(RangeError)
  })

  it('if', () => {
    expect(
      runFromText(`:= [age; 18]; 
 ? [>= [age; 18]; "Can work!"; "Can't work"];
    `)
    ).toBe('Can work!')
    expect(
      runFromText(` 
        := [validate age; -> [age; ? [>= [age; 18]; ~ ["Can work"; ? [>=[age; 21]; " and can drink"; ""]]; "Can't work and can't drink"]]];
        .: [validate age [18]; validate age [21]; validate age [12]];
    `)
    ).toEqual([
      'Can work',
      'Can work and can drink',
      "Can't work and can't drink",
    ])
  })

  it('switch case', () => {
    expect(
      runFromText(` 
     := [switch case; -> [matcher; 
          ?? [
          . [:: [
            "knock knock"; -> [..["who's there"]]; 
            "meaning of life"; -> [..[42]];
            ;; add more cases here
            ;; ...
          ]; matcher]; 
            ;; default case
          -> ["nothing matched"]
        ][]]];
        .: [switch case ["meaning of life"]; switch case [0]; switch case  ["knock knock"]];
    `)
    ).toEqual([42, 'nothing matched', "who's there"])
  })

  it('valid parens', () => {
    expect(
      runFromText(`.. [<- ["BINAR"; "ARRAY"; "LOGIC"] [LIBRARY]; 
    <- ["from"; "to"; "balance"; "append"; "prepend"; "tail"; "first"; "isempty"] [BINAR]; 
    ;; find if parens are valid for pairs of "(" and ")"
    := [isvalidparens; -> [input; 
    |> [input; 
      | from [];  
      | to [-> [acc; x; index; arr;
        ? [== ["("; x]; prepend [acc; x]; 
            ? [== [first [acc]; "("]; tail [acc]; 
              append [acc; x]]]]]; 
      | isempty []]]];
      .:[
      is valid parens ["(()))"];
      is valid parens ["(())"]]];`)
    ).toEqual([0, 1])
  })

  it('fib sum', () => {
    expect(
      runFromText(`;; calculating fib sequance
        := [fib; -> [n; ? [
          > [n; 0]; 
             ? [== [n; 1]; 1;
              ? [== [n; 2]; 1; 
                + [fib [- [n; 1]]; fib [- [n; 2]]]]]; n]]];
              fib[10]
                `)
    ).toBe(55)
  })

  it('max sub array sum rec', () => {
    expect(
      runFromText(`;; max_sub_array_recursive
    <- ["MATH"] [LIBRARY];
    <- ["max"; "infinity"] [MATH];
    ~= [loop; -> [i; nums; maxGlobal; maxSoFar; 
        ? [< [i; . [nums; "length"]]; .. [
        = [maxGlobal; max [maxGlobal; = [maxSoFar; max [0; + [maxSoFar; . [nums; i]]]]]];
        loop [= [i; + [i; 1]]; nums; maxGlobal; maxSoFar]]; 
        maxGlobal]]]
    [0; .: [1; -2; 10; -5; 12; 3; -2; 3; -199; 10]; * [infinity; -1]; * [infinity; -1]]`)
    ).toBe(21)
  })
  it('sum median', () => {
    expect(
      runFromText(`
<- ["MATH"; "ARRAY"] [LIBRARY];
<- ["sum"] [MATH];
<- ["range"] [ARRAY];

:= [NUMBERS; range [1; 100]];
:= [first; . [NUMBERS; 0]];
:= [last; . [NUMBERS; - [. [NUMBERS; "length"]; 1]]];
:= [median; + [first; 
- [* [last; * [+ [1; last]; 0.5]]; 
    * [first; * [+ [1; first]; 0.5]]]]];
== [sum [NUMBERS]; median]
    `)
    ).toBe(1)
  })

  it('sum tree nodes', () => {
    expect(
      runFromText(`;; sum_tree_nodes
    := [node; -> [value; left; right; 
      :: ["value"; value; 
          "left"; left; 
          "right"; right]]];
    
    := [sum; -> [item; 
      ? [== [item; void];
        0; 
        + [. [item; "value"]; 
           sum [. [item; "left"]]; 
           sum [. [item; "right"]]]]]];
    
    := [myTree; 
      node [1; 
        node [2; 
          node [4; void; void]; 
          node [6; void; void]]; 
      node [3; 
        node [5; void; void]; 
        node [7; void; void]]]];
        sum [myTree]
    `)
    ).toBe(28)
  })

  it('length of string', () => {
    expect(runFromText(`. ["01010"; "length"];`)).toBe(5)
  })

  it('binar should work', () => {
    expect(
      runFromText(`<- ["BINAR"] [LIBRARY];
    <- ["ones"; "zeroes"; "map"; "toarray"] [BINAR];
    |> [10; 
       | ones []; 
       | map [-> [x; i; a; * [x; 254]]];
       | to array []]`)
    ).toEqual([254, 254, 254, 254, 254, 254, 254, 254, 254, 254])

    expect(
      runFromText(`
<- ["BINAR"; "LOGIC"] [LIBRARY];
<- ["makebinar"; "fill"; "map"; "filter"; "toarray"] [BINAR];
<- ["iseven"; "isodd"] [LOGIC];
|> [
  make binar [];
  | fill [1; 2; 3; 4; 5; 6; 7; 8];
  | map [-> [x; i; a; * [x; x]]];
  | filter [is even];
  | to array []
];
    `)
    ).toEqual([4, 16, 36, 64])
  })

  it('* import should work', () => {
    expect(
      runFromText(`<- ["BINAR"; "MATH"] [LIBRARY];
    <- ["*"] [BINAR];
    <- ["floor"] [MATH];
    
    |> [make binar [];
        | fill [1.3; 3.4; 4.8];
        | map [floor];
        | to array []
       ]
    `)
    ).toEqual([1, 3, 4])
  })

  it('nested pipes should work', () => {
    expect(
      runFromText(`
      |> [
        10;
        | call [-> [x; * [x; 3]]];
        | call [-> [x; * [x; 10]]]
      ]`)
    ).toEqual(300)
    expect(
      runFromText(`<- ["BINAR"; "MATH"] [LIBRARY];
      <- ["ones"; "zeroes"; "map"; "toarray"] [BINAR];
      <- ["cos"; "floor"] [MATH];
      |> [10; 
         | ones []; 
         | map [-> [x; i; a; 
                    |> [x; | * [
                            |> [24; 
                              | : [|> [i; 
                                       | + [1];
                                       | * [-1]]]; 
                              | floor[]]];
                          | + [12];
                          | cos [];
                          | * [100];
                          | floor []
                       ]]];
         | to array []]`)
    ).toEqual([84, 100, -66, 96, 75, -15, -15, -92, -92, -92])
  })
  it('>> and << should work', () => {
    expect(
      runFromText(`
      := [out; .: []];
      >> [.: [1; 2; 3; 4]; -> [x; i; a; .= [out; i; * [x; 10]]]];
      << [.: [10; 20; 30]; -> [x; i; a;.= [out; i; - [. [out; i]; * [x; 0.1]]]]];
      >> [out; -> [x; i; a; .= [out; i; + [x; i]]]];
      out;
    `)
    ).toEqual([9, 19, 29, 43])

    expect(
      runFromText(`
    |> [
      .: [1; 2; 3; 4];
      | >> [-> [x; i; a; .= [a; i; * [x; 10]]]];
      | << [-> [x; i; a; .= [a; i; - [. [a; i]; * [x; 0.1]]]]];
      | >> [-> [x; i; a; .= [a; i; + [x; i]]]];
      | << [-> [x; i; a; .= [a; i; + [. [a; i]; i; 1]]]];
    ]
    `)
    ).toEqual([10, 21, 32, 43])
  })

  it('=> should work as expected', () => {
    expect(
      runFromText(`
:= [dfs; -> [node; out; .. [
  ? [!= [. [node; "=>"]; void]; 
      >> [. [node; "=>"]; 
          -> [x; i; a; .. [
                  .= [out; . [out; "length"]; . [x; "*"]]; 
                  dfs [x; out]]]]];
                      out]]];

:= [n; => [10; => [2; => [2.1]; => [2.2]; => [2.3]; => [2.4]]]];
dfs [n; .: []];
    `)
    ).toEqual([2, 2.1, 2.2, 2.3, 2.4])
  })
})
