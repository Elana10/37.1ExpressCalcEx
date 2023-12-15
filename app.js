const express = require('express');
const ExpressError = require('./expresserror');
const math = require('mathjs');

const app = express();

app.use(express.json());

function isNumber(numbers){
    let numArr = []
    for(let n of numbers){
        if(!parseInt(n)){
            throw new ExpressError(`Only numbers allowed. ${n} is not a number.`, 400)
            
        } 
        numArr.push(parseInt(n))
    }
    return numArr
}

app.get('/mean', (req,res,next)=>{
    try{
        const nums = req.query.nums;
        const numbers = nums.split(',');

        if(nums.length < 1){
            throw new ExpressError('Nums are required', 400)
        }   
        const numArr = isNumber(numbers)      
        const value = mean(numArr)
        return res.json({
            operation:"mean",
            value: value
        })
    } catch (e){
        next(e)
    }
})
app.get('/median', (req,res,next)=>{
    try{
        const nums = req.query.nums;
        const numbers = nums.split(',');

        if(nums.length < 1){
            throw new ExpressError('Nums are required', 400)
        }   
        const numArr = isNumber(numbers)  
        const value = median(numArr)
        return res.json({
            operation:"median",
            value: value
        })
    } catch (e){
        next(e)
    }
})
app.get('/mode', (req,res,next)=>{
    try{
        const nums = req.query.nums;
        const numbers = nums.split(',');

        if(nums.length < 1){
            throw new ExpressError('Nums are required', 400)
        }   
        const numArr = isNumber(numbers)  
        const value = math.mode(numArr)
        return res.json({
            operation:"mode",
            value: value
        })
    } catch (e){
        next(new ExpressError('mode function issue', 410))
    }
})

function mean(nums){
    let sum = 0;
    for(let i =0; i <nums.length; i++){
        sum = sum + nums[i];
    }

    return (sum/nums.length);
}

function median(nums){
    let index = nums.length/2;
    nums = nums.sort()

    if(nums.length % 2 === 0){
        return ( (nums[(index-1)] + nums[(index)]) / 2  )          
    } else {
        return nums[(index-.5)]    
    }
}

app.use((req, res, next) =>{
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

app.use((error, req, res, next) =>{
    let status = error.status || 500;
    let message = error.msg
    
    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, function(){
    console.log('App on port 3000')
})

module.exports ={ mean, median, isNumber}