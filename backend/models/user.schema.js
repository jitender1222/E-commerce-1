
import mongoose from "mongoose";
import authRoles from "../utils/authRoles";

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

    export default mongoose.model=('User',userschema);