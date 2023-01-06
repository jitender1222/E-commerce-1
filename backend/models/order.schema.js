

import mongoose from "mongoose";
import status from "../utils/status";

const orderSchema= mongoose.Schema(
    {
        products:{

            type:[
                {
                productID:{
                    type:mongoose.model.Types.ObjectID,
                    ref:"Product",
                    required:true,
                },
                count:Number,
                price:Number
            }
            ],
            required:true,
        },

        user:{

            type:mongoose.model.Types.ObjectID,
            ref:"User",
            required:true,
        },

        phone:{

            type:Number,
            require:true
        },

        address:{

            type:String,
            required:true
        },

        amount:{

            type:String,
            required:true,
        },

        coupon: String,
        transactionID:String,

        orderStatus:{

            enum: Object.values(status),
            default: status.ORDERED,
        },


        // we can also add paymet mode like upi creditcard wallet cod

        
    },
    {
        timestamps:true,
    }
)