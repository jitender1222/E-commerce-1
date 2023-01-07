

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

        throw new CustomError('Please fill all the fields',400);
    }

    const user=await User.create({

        name:name,
        email:email,
        password:password,
    })

    const token=user.getJwtToken();
    console.log(user);
    user.password=undefined;
})