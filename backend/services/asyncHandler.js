
const asyncHandler=(fn)=> async (req,res,next) =>{

    try{

        await fn(req,res,next);
    }

    catch(err){

        res.status(err.code || 500).json({

            success:false,
            message:err.message,    
        })
    }
}

export default asyncHandler;



// another way to write the above function

// function asyncHandler(fn){

//     return async function(req,res,next){

//         try{

//             await fn(req,res,next);
//         }
//         catch(err){

//             res.status(err.code || 500).json({

//                 success:false,
//                 message:err.message,    
//             })
//         }
//     }
// }