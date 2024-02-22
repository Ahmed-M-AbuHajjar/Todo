import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";

export default function AddTodo ({ onClose }) {
    // Initialize react-hook-form
    const { register, handleSubmit } = useForm();
    // Initialize queryClient from react-query
    const queryClient = useQueryClient();
    // State to track if form is submitting
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mutation for creating new todo
    const createTodoMutation = useMutation(
        // Mutation function
        (newTodo) => {
            // Get token from localStorage
            const token = localStorage.getItem("token");
            // Configure headers with authorization token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            // Send post request to create new todo with authorization header
            return axios.post("http://localhost:8080/api/v1/todo/create", newTodo, config);
        },
        {
            // Invalidate todos query on success
            onSuccess: () => {
                queryClient.invalidateQueries("todos");
            },
        }
    );
    // Form submit handler
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Execute createTodoMutation asynchronously
            await createTodoMutation.mutateAsync(data);
            // Close the modal after successful submission
            onClose();
        } catch (error) {
            // Handle error and show toast notification
            toast.error('Failed to add todo. Please try again.');
        } finally {
            // Set submitting state to false
            setIsSubmitting(false);
        }
    };
    
    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-lg font-bold mb-4">Add New Todo</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input {...register("title", { required: true })} type="text" placeholder="Title" className="border rounded-md px-3 py-2 w-full" />
                        <textarea {...register("description", { required: true })} rows="4" placeholder="Description" className="border rounded-md px-3 py-2 w-full"></textarea>
                        <div className="flex justify-between">
                            <button type="button" className="bg-gray-300 hover:bg-gray-200 text-red-400 font-bold py-2 px-4 rounded mr-2" onClick={onClose} disabled={isSubmitting}>
                                Cancel
                            </button>
                            <button type="submit" className="bg-gray-300 hover:bg-gray-200 text-green-400 font-bold py-2 px-4 rounded mr-2" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}
