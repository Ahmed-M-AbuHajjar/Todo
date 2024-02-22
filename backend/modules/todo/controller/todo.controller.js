// Importing Todo model and HTTP status codes
import { todoModel } from "../../../DB/models/todo.model.js";
import HttpStatus from 'http-status-codes';

// Controller Functions:
// Create
export const create = async ( req, res ) => {
    try {
        // Destructuring title and description from request body
       const {title,description} = req.body;  
       // Creating a new Todo with createdBy set to the current user's ID 
       const addedTodo = await todoModel.create({title,description,createdBy:req.user._id});
       // Responding with success message and added Todo data
       res.status(HttpStatus.CREATED).json({message:'Todo created successfully',addedTodo});
    } catch (error) {
        // Responding with internal server error if an unexpected error occurs
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error',error});
    }
};
// Update
export const update = async ( req, res) => {
    try {
        // Extracting Todo ID from request parameters
        const { id } = req.params;
        // Destructuring title and description from request body
        const { title, description } = req.body;
        // Finding the Todo by ID and createdBy user ID
        const foundTodo = await todoModel.findOne({_id:id, createdBy:req.user._id});
        if(!foundTodo){
            // Responding with error if Todo is not found
            res.status(HttpStatus.NOT_FOUND).json({message:'No todo found with this Id'})
        } else {
            // Updating Todo title and description
            foundTodo.title = title;
            foundTodo.description = description
            // Saving the updated Todo
            const updatedTodo = await foundTodo.save();
            // Responding with success message and updated Todo data
            res.status(HttpStatus.OK).json({message:'Todo updated successfully',updatedTodo});
        }
    } catch (error) {
        // Responding with internal server error if an unexpected error occurs
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error',error});
    }
};
// Delete
export const remove = async( req, res) => {
    try {
        // Extracting Todo ID from request parameters
        const { id } = req.params;
        // Finding the Todo by ID and createdBy user ID
        const foundTodo = await todoModel.findOne({ _id: id, createdBy: req.user._id });
        if(!foundTodo){
            // Responding with error if Todo is not found
            res.status(HttpStatus.NOT_FOUND).json({message:'Invalid todo Id'});
        } else {
            // Deleting the found Todo
            await todoModel.deleteOne(foundTodo);
            // Responding with success message
            res.status(HttpStatus.OK).json({message:'Todo deleted successfully'});
        }
       
    } catch (error) {
        // Responding with internal server error if an unexpected error occurs
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error',error});
    }
};
// Get All
export const getAll = async( req, res ) => {
    try {
        // Finding all Todos created by the current user
        const foundTodos = await todoModel.find({createdBy: req.user._id});
        // Responding with success message and found Todos data
        res.status(HttpStatus.OK).json({message:'Todos retrieved successfully',foundTodos});
    } catch (error) {
        // Responding with internal server error if an unexpected error occurs
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error',error})
    }
};
// Get By Id
export const getById = async ( req, res ) => {
    try {
        // Extracting Todo ID from request parameters
        const { id } = req.params;
        // Finding the Todo by ID and createdBy user ID
        const foundTodo = await todoModel.findOne({ _id: id, createdBy: req.user._id });
        if(foundTodo){
            // Responding with success message and found Todo data if it exists
            res.status(HttpStatus.OK).json({message:'Todo retrieved successfully',foundTodo});
        } else {
            // Responding with error if Todo is not found
            res.status(HttpStatus.NOT_FOUND).json({message:'Invalid id'});
        }
    } catch (error) {
        // Responding with internal server error if an unexpected error occurs
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error',error});
    }
};
// Update Status
export const updateStatus = async ( req, res) => {
    try {
        // Extracting Todo ID from request parameters
        const { id } = req.params;
        // Extracting status from request body
        const { status } = req.body;
        // Finding the Todo by ID and createdBy user ID
        const foundTodo = await todoModel.findOne({ _id: id, createdBy: req.user._id });
        if(!foundTodo){
            // Responding with error if Todo is not found
            res.status(HttpStatus.NOT_FOUND).json({message:'No todo found with this Id'});
        } else {
        // Updating Todo status
        foundTodo.status = status;
        // Saving the updated Todo status
        const updatedTodoStatus = await foundTodo.save();
        // Responding with success message and updated Todo statu
        res.status(HttpStatus.OK).json({message:'Todo status updated successfully',updatedTodoStatus});
        }
    } catch (error) {
        // Responding with internal server error if an unexpected error occurs
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'error',error})
    }
};