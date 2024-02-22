// Importing mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Defining the schema for the Todo model
const todoSchema = new mongoose.Schema({
    // Title field with required, trimming, and length constraints
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [2, 'Title must be at least 2 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    // Description field with trimming and length constraints
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    // Status field with enum validation and default value
    status: {
        type: String,
        enum: ['pending','completed'],
        default: 'pending',
    },
    // Reference to the user who created the todo
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }
},{
    timestamps:true
});

// Enum validation middleware
todoSchema.pre('update', function (next) {
    const update = this.getUpdate();
    const status = update.status;

    // Check if 'status' field is being updated and if the new value is valid
    if (status && !['pending', 'completed'].includes(status)) {
        return next(new Error('Invalid status value'));
    }

    next();
});

// Creating the Todo model based on the schema
export const todoModel = mongoose.model('todo',todoSchema);