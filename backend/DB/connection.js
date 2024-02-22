// Importing mongoose library for MongoDB interaction
import mongoose from 'mongoose';

// Function to establish connection to MongoDB database
export const connection = async () => {
    // Using async/await to handle asynchronous operation of connecting to MongoDB
    return await mongoose.connect('mongodb+srv://ahmedmoustafa1803:Todo_Inframodern@cluster0.rlpfjap.mongodb.net/').then(() => {
        // Log a success message when connection is established
        console.log('DB connected');
    }).catch(() => {
        // Log an error message if connection fails
        console.log('error');
    });
}