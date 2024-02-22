import axios from "axios";
import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateTodo ({todo, onClose}) {
    // useForm hook for form handling
    const { register, handleSubmit } = useForm();
    // State for updating status
    const [isUpdating, setIsUpdating] = useState(false);
    // useQueryClient hook for managing queries
    const queryClient = useQueryClient();
    // useMutation hook for updating todo
    const updateTodoMutation = useMutation(
        // Mutation function to update todo
        (updatedTodo) => {
            // Get token from local storage
            const token = localStorage.getItem('token');
            const config = {
                // Set authorization header with token
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            };
            // Send PATCH request to update todo
            return axios.patch(`http://localhost:8080/api/v1/todo/update/${todo._id}`,updatedTodo,config);
        },
        {
            onSuccess:() => {
                queryClient.invalidateQueries('todos');
            },
        }
    );

    // Function to handle form submission
    const onSubmit = async (data) => {
        // Set updating state to true
        setIsUpdating(true);
        try {
            // Mutate todo with updated data
            await updateTodoMutation.mutateAsync(data);
            // Close the update todo modal
            onClose();
        } catch (error) {
            // Display error message if update fails
            toast.error('Failed to add todo. Please try again.');
        } finally {
            // Set updating state to false
            setIsUpdating(false);
        }
    };

    return(
        <>
         <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Update Todo</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("title", { required: true })}
              type="text"
              defaultValue={todo.title}
              className="border rounded-md px-3 py-2 w-full"
            />
            <textarea
              {...register("description", { required: true })}
              rows="4"
              defaultValue={todo.description}
              className="border rounded-md px-3 py-2 w-full"
            ></textarea>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-200 text-red-400 font-bold py-2 px-4 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gray-300 hover:bg-gray-200 text-green-400 font-bold py-2 px-4 rounded mr-2"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
        </>
    )
}

