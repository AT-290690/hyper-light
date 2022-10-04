import { removeNoCode, run, compileModule } from '../language/misc/utils.js'
describe('run should work as expected', () => {
  it('definitions', () => {
    expect(
      run(
        removeNoCode(
          `:= [x; 10]; := [y; 3]; := [temp; x]; = [x; y]; = [y; temp]; :: ["x"; x; "y"; y]`
        )
      )
    ).toEqual({ x: 3, y: 10 })

    expect(() => run(removeNoCode(`: [29; 0]`))).toThrow(RangeError)
  })
  it('simple math', () => {
    expect(
      run(
        removeNoCode(
          `:= [x; 30]; := [result; + [: [* [+ [1; 2; 3]; 2]; % [4; 3]]; x]];`
        )
      )
    ).toBe(42)
    expect(() => run(removeNoCode(`: [29; 0]`))).toThrow(RangeError)
  })
  it('if', () => {
    expect(() =>
      run(
        removeNoCode(`:= [age; 18]; 
 ? [>= [age; 18]; "Can work!"; "Can't work"];
    `)
      )
    ).toBe
    ;('Can work!')
    expect(
      run(
        removeNoCode(` 
        := [validate age; -> [age; ? [>= [age; 18]; + ["Can work"; ? [>=[age; 21]; " and can drink"; ""]]; "Can't work and can't drink"]]];
        .: [validate age [18]; validate age [21]; validate age [12]];
    `)
      )
    ).toEqual([
      'Can work',
      'Can work and can drink',
      "Can't work and can't drink",
    ])
  })

  it('switch case', () => {
    expect(
      run(
        removeNoCode(`
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
      )
    ).toEqual([42, 'nothing matched', "who's there"])
  })
  it('valid parens', () => {
    expect(
      run(
        removeNoCode(`.. [<- ["BINAR"; "ARRAY"; "LOGIC"] [LIBRARY]; 
    <- ["from"; "to"; "balance"; "append"; "prepend"; "tail"; "first"; "is empty"] [BINAR]; 
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
      )
    ).toEqual([0, 1])
  })
})
