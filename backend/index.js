import mongoose from "mongoose";

import app from "./app";

import config from "./config/index";


// we make a IIFE function because we want on loading this file our database directly run .

// create a function 
// run a function 

// (async () => {}) ()


(async ()=>{

    try {

        await mongoose.connect(config.MONGODB_URL)
        console.log("DB Connected successfully");

        app.on('error',(err)=>{

            console.log("ERROR:",err);
            throw err;
        })

        const listen=()=>{

            console.log(`Listening on ${config.PORT}`)
        }

        app.listen(config.PORT, listen)

        
    } catch (error) {

        console.log("Error",err);

        throw err
    }
})


()