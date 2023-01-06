

import mongoose from "mongoose";


const collectionSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please provide a category name"],
            trim:true,
            maxlength:[120,"Collection name should be less than or equal then 120 characters"],
        },
    },

    {
        timestamps:true
    }
)

export default mongoose.model("Collections",collectionSchema);

