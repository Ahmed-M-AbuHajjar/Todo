// Importing necessary modules
import express from 'express';
import cors from 'cors';
import { connection } from './DB/connection.js';
import * as routes from './modules/index.routes.js';

// Creating an Express application
const app = express();

// Establishing connection to the MongoDB database
connection();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Base URL for API endpoints
const baseURL = '/api/v1';
// Mounting user and todo routers to their respective base URLs
app.use(`${baseURL}/user`, routes.userRouter);
app.use(`${baseURL}/todo`, routes.todoRouter);
// Route for handling invalid API endpoints
app.get('*', (req,res) =>{
    res.json({message:"invalid api"})
})
// Starting the Express server on port 8080
app.listen(8080, ()=> {
    console.log("server is running...");
})