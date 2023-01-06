
import mongoose from "mongoose";


const productSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please provide a product name"],
            maxLength:[120,"product name must be 120 characters long"],
            trim:true
        },

        price:{
            type:Number,
            required:[true,"please provide a product Price"],
            maxLength:[5,"product price should not be more than 5 characters"],
            trim:true
        },

        description:{

            type:String,

            // use some form of editor - personal assignment
        },

        photos: [
            {
                secure_url:{
                    type:String,
                    required:true,
                }
            }
        ],

        stock:{

            type:Number,
            default:true,
        },

        sold:{

            type:Number,
            default:0,
        },

        // we have to put our products into the collection

        // we are giving the ref to our collection

        collectionId:{

            type:mongoose.Schema.Types.ObjectId,
            ref:"Collection",
        }
    }
)

export default mongoose.model("Product",productSchema);