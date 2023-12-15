const {mean, median, isNumber} = require('./app.js');
const ExpressError = require('./expresserror');


test('mean', ()=>{
console.log(mean([1,2,3,4]))    
    expect(mean([1,1,1,1])).toEqual(1);
    expect(mean([1,2,3,4])).toEqual(2.5);
    expect(mean([1,2,3,4,5])).toEqual(3);
}) 

test('median', ()=>{
    expect(median([2,1,3])).toEqual(2);
    expect(median([1,2,3,4])).toEqual(2.5);
})

test('isNumber', ()=>{
    expect(isNumber(['1'])).toEqual([1])
    expect(isNumber(['1','345','34'])).toEqual([1,345,34])
    expect(() => isNumber(['1', 'asdf'])).toThrow(
        new ExpressError('Only numbers allowed. asdf is not a number.', 400)
      );
})