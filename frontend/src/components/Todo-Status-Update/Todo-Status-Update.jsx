import React from "react";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

export default function TodoStatusUpdate ({ todo }) {
    const queryClient = useQueryClient();
    // useMutation hook for updating todo status
    const statusUpdateMutation = useMutation(
        // Mutation function to update todo status
        (updatedTodo) => {
          // Get token from local storage
          const token = localStorage.getItem('token');
          const config = {
            // Set authorization header with token
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          // Send PATCH request to update todo status
          return axios.patch(`http://localhost:8080/api/v1/todo/update/status/${updatedTodo._id}`, { status: updatedTodo.status }, config);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries('todos');
          },
        }
      );

      // Function to handle toggling todo status
      const handleToggleStatus = () => {
        // Toggle todo status
        const updatedStatus = { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' };
        // Mutate todo status
        statusUpdateMutation.mutate(updatedStatus);
      };
    return(
        <>
        <button
          className={`mr-2 py-2 px-4 rounded text-white font-bold focus:outline-none ${todo.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
          onClick={handleToggleStatus}
        >
          {todo.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
        </button>
      </>
    )
}

