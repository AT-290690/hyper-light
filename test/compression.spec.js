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
