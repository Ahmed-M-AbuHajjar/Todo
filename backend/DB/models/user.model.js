// Importing mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Defining the schema for the User model
const userSchema = new mongoose.Schema({
    // Name field with required, validation, and length constraints
    name: {
        type: String,
        required: [true, 'User name is required'],
        validate: {
            validator: function(value) {
                return/^[a-zA-Z\s]+$/.test(value);
            },
            message: 'User name must contain only letters'
        },
        minLength: [2, 'Minimum length 2 characters'],
        maxLength: [20, 'Maximum length 20 characters'],
    },
    // Email field with uniqueness, required, and match constraints
    email: {
        type: String,
        unique: [true, 'Email must be unique'],
        required: [true, 'Email is required'],
        match: [/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, 'Please enter a valid email address']
    },
    // Password field with required constraint
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
},{
    timestamps:true
});

// Creating the User model based on the schema
export const userModel = mongoose.model('user',userSchema);