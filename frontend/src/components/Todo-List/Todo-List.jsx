import React from "react";
import TodoItem from "../Todo-Item/Todo-Item";
import { useQuery } from "react-query";
import axios from 'axios';

// Function to fetch todos from the server
const fetchTodos = async() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    const config = {
        // Set authorization header with the token
        headers:{
            Authorization:`Bearer ${token}`,
        },
    };
    // Send GET request to fetch todos
    const response = await axios.get('https://todolist-backend-m85o.onrender.com/api/v1/todo',config);
    // Return the todos from the response data
    return response.data.foundTodos
};

export default function TodoList () {
    const {data:todos, isLoading, isError} = useQuery('todos',fetchTodos);
    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Error fetching todos</div>;
    return(
        <>
            <div>
                {todos.map(todo => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </div>
        </>
    )
}

