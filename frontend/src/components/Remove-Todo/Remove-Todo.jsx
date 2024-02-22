import axios from "axios";
import React,{useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast,ToastContainer } from "react-toastify";

export default function RemoveTodo ({ todo, onClose }) {
    const queryClient = useQueryClient();
    // State to manage delete operation
    const [isDeleting, setIsDeleting] = useState(false);
    // Define mutation for deleting a todo
    const removeTodoMutation = useMutation(
        async() => {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            const config = {
                // Set authorization header
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            };
            // Make delete request to remove todo
            await axios.delete(`http://localhost:8080/api/v1/todo/delete/${todo._id}`, config);
        },
        {
            // Invalidate query on successful deletion
            onSuccess: () => {
                queryClient.invalidateQueries('todos');
            },
        }
    );

    // Function to handle removal of todo
    const handleRemove = async () => {
        setIsDeleting(true);
        try {
            // Execute removeTodo mutation
            await removeTodoMutation.mutateAsync();
            // Close the confirmation box
            onClose();
        } catch (error) {
            // Display error toast if deletion fails
            toast.error('Failed to Remove todo. Please try again.');
        } finally {
            // Set deleting state back to false
            setIsDeleting(false);
        }
    };

    return(
        <>
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">
          Are you sure you want to remove this Todo item?
        </h2>
        <div className="flex justify-between">
          <button
            className="bg-gray-300 hover:bg-gray-200 text-red-400 font-bold py-2 px-4 rounded mr-2"
            onClick={onClose} // Close the confirmation box
          >
            No
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-200 text-green-400 font-bold py-2 px-4 rounded mr-2"
            onClick={handleRemove} // Trigger the delete API
          >
            {isDeleting ? 'Removing...' : 'Yes'}
          </button>
        </div>
      </div>
    </div>
        <ToastContainer/>
     </>   
    )
}

