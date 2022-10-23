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
    expect(compress(raw)).toEqual(
      ":=[c0;->[a0;b0;*[a0;b0'3;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;c0[2;2'12"
    )
    expect(raw.length > compress(raw).length).toBe(true)
  })
})
