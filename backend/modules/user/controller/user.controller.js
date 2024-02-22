// Importing user model, bcryptjs for password hashing, JSON Web Token, and HTTP status codes
import { userModel } from "../../../DB/models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

// Controller Functions:
// sign up
export const signUp = async(req,res) => {
    try {
        // Destructuring required fields from request body
        const {name,email,password,cPassword} = req.body;
        // Perform password validation before hashing
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Password is not valid. It must contain at least 8 characters, including 1 special character and 1 number.' });
        }
        // Check if the user already exists
        const foundedUser = await userModel.findOne({email});
        // Check if the passwords match
        if(password == cPassword){
            if(foundedUser){
                // If user already exists, respond with error
                res.status(HttpStatus.BAD_REQUEST).json({message:'user already registered'});
            } else {
                // Hash the password
                let hashed = await bcryptjs.hash(password,7);
                // Create a new user instance
                let user = new userModel({name,email,password:hashed});
                // Save the user to the database
                let savedUser = await user.save();
                 // Respond with success message and saved user data
                res.status(HttpStatus.CREATED).json({message:'user created successfully',savedUser});            
            }
        } else {
            // If passwords do not match, respond with error
            res.status(HttpStatus.BAD_REQUEST).json({message:"Password not matching cPassword"});
        }
    } catch (error) {
        // Respond with internal server error if an unexpected error occurs
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error',error});
    }
};
// sign in
export const signIn = async (req,res) => {
    try {
        // Destructuring email and password from request body
        const { email, password } = req.body;
         // Find user with the provided email
        const foundedUser = await userModel.findOne({email});
        if(foundedUser){
            // If user exists, compare the passwords
            let matched = await bcryptjs.compare(password,foundedUser.password);
            if(matched){
                // If passwords match, generate JWT token
                let token = jwt.sign({id:foundedUser._id},'todo');
                // Respond with success message, user data, and token
                res.status(HttpStatus.OK).json({message:'welcome', foundedUser,token});
            } else {
                // If passwords do not match, respond with error
                res.status(HttpStatus.BAD_REQUEST).json({message:'Invalid password'});
            }
        } else {
            // If user does not exist, respond with error
            res.status(HttpStatus.NOT_FOUND).json({message:'no user found with this email'});
        }
    } catch (error) {
        // Respond with internal server error if an unexpected error occurs
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error',error})
    }
};

