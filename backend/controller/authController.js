

import User from "../models/user.schema";

import asyncHandler from "../services/asyncHandler";

import CustomError from "../utils/customError";

export const cookieOptions={

    expires:new Date(Date.now()+3 * 24 * 60 * 60 * 1000),

    http:true,

    // could be inside utils 
}

/*********************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signup Controller for creating new User
 * @Parameters name,email,password
 * @returns User Object

*********************************************************/

export const signUp=asyncHandler(async(req,res) =>{

    const {name,email,password}=req.body

    if(!name || !email || !password){

        throw new CustomError('Please fill all the fields',400);
    }

    // check if the user exist

    const existingUser= await User.findOne({email})

    if(existingUser){

        throw new CustomError('user is already exist',400);
    }

    const user=await User.create({

        name:name,
        email:email,
        password:password,
    })

    const token=user.getJwtToken();
    console.log(user);
    user.password=undefined;

    res.cookie("token",token,cookieOptions);

    res.status(200).json({
        success:true,
        token,
        user
    })
})


/*********************************************************
 * @LOGIN
 * @route http://localhost:5000/api/auth/login
 * @description User login Controller for logging new user
 * @Parameters email,password
 * @returns User Object

*********************************************************/

export const login=asyncHandler(async(req,res) =>{

    const {email,password}=req.body

    if(!email || !password){

        throw new CustomError('Please fill all the fields',400);
    }

    // check if the user exist

    const user= await User.findOne({email}).select("+password");

    if(!user){

        throw new CustomError('Invalid Credentails',400);
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){

        throw new CustomError('Invalid Credentials -pass',400)
    }

    const token=user.getJwtToken()
    user.password=undefined;
    res.cookie("token",token,cookieOptions)

    return res.status(200).json({

        success:true,
        token,
        user,
    })
})




/*********************************************************
 * @LOGOUT
 * @route http://localhost:5000/api/auth/logout
 * @description User 
 * @Parameters 
 * @returns 

*********************************************************/

export const logout=asyncHandler(async(_req,res)=>{

    // we can also use cookie.clear

    res.cookie("token",null,{

        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({

        success:true,
        message:"Logged Out"
    })
})