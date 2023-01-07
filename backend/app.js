
const express=require('express');

import cookieParser from 'cookie-parser';

import morgan from 'morgan';

import cors from "cors";

const app=express();


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cookieParser())

// morgan logger

// morgan -> it prints information about the apis requests and response in the console

app.use(morgan('tiny'));

// cors is basically used for security purposes by which we give permission to only certain user to sennd the requests from the apis

app.use(cors());



export default app;