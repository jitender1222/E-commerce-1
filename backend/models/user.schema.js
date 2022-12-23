
import mongoose from "mongoose";
import authRoles from "../utils/authRoles";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import crypto from "crypto"

const userschema=mongoose.Schema(
    {
        name:{

            type:String,
            required:[true,"Name is required"],
            maxLen:[10,"Name should atleast 8 Characters long"],
        },
        email:{

            type:String,
            required:[true,"E-Mail is required"],
            unique:true,
        },

        password:{

            type:String,
            required:true,
            select:false,
            minLen:[8,"password must be atleast 8 char long"],
        },
        roles:{
            
            type:String,
            enum:Object.values(authRoles),
            default:authRoles.USERS
        },

        forgotPasswordToken:String,
        forgotPasswordExpiry:String
    },
    {
        timestamps:true
    }
    );

    // encrypt password

    userschema.pre('save',async function(next){

        if(!this.modified("password")) return next();

            this.password=await bcrypt.hash(this.password,10);
            
            next();
    })

    export default mongoose.model=('User',userschema);