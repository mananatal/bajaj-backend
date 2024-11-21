import { asyncHandler } from "../utils/asyncHandler.js";

const isPrime = (num) => {
    if (num <= 1){
        return false; 
    }
    for (let i = 2; i < Math.sqrt(num) + 1; i++) {
      if (num % i == 0){
        return false;
      } 
    }
    return true;
};

const postMethod=asyncHandler(async (req,res)=>{
    const {data,file_b64 }=req.body;

    if(!data || !Array.isArray(data) ){
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input format.',
        });
    }


    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));
    const lowercaseAlphabets = alphabets.filter((ch) => /[a-z]/.test(ch));
    const highestLowercase = lowercaseAlphabets.sort().pop() || null;
    const containsPrime = numbers.some(num=>isPrime(num));


    let isFileValid = false,
    fileMimeType = null,
    fileSize = null;

    if (file_b64) { 
        try {
            const buffer = Buffer.from(file, 'base64');
            fileMimeType = require('mime-types').lookup(buffer);
            fileSize = (buffer.length / 1024).toFixed(2);
            isFileValid = !!fileMimeType;
        } catch (error) {
            isFileValid = false;
        }
    }


    if(!file_b64){
        res.status(200).json({
            is_success: true,
            user_id: 'Manan_Atal_25062002', 
            college_email: 'mananatal210093@acropolis.in',
            college_roll_number: '0827CS211141',
            numbers,
            alphabets,
            highest_lowercase: highestLowercase,
            contains_prime: containsPrime,
            file_valid: isFileValid,
        });
    }
    else{
        res.status(200).json({
            is_success: true,
            user_id: 'Manan_Atal_25062002', 
            college_email: 'mananatal210093@acropolis.in',
            college_roll_number: '0827CS211141',
            numbers,
            alphabets,
            highest_lowercase: highestLowercase,
            contains_prime: containsPrime,
            file_valid: isFileValid,
            file_mime_type: fileMimeType,
            file_size_kb: fileSize,
        });
    }

})


const getMethod=asyncHandler((req,res)=>{
    res.status(200).json({
        operation_code: 1,
    });
})

export {
    getMethod,postMethod
}