import React, {useState} from "react";
import RemoveTodo from "../Remove-Todo/Remove-Todo";
import TodoStatusUpdate from "../Todo-Status-Update/Todo-Status-Update";
import UpdateTodo from "../Update-Todo/Update-Todo";
import { useForm } from "react-hook-form";


export default function TodoItem ({todo}) {
    // Initialize useForm hook
    const { register, handleSubmit } = useForm();
    // State for managing edit mode
    const [isEditing, setIsEditing] = useState(false);
    // State for managing remove mode
    const [isRemoving, setIsRemoving] = useState(false);

    // Function to handle update click
    const handleUpdateClick = () => {
        // Set editing state to true
        setIsEditing(true);
    }

    const handleRemoveClick = () => {
        // Set removing state to true
        setIsRemoving(true);
    }



    return(
        <>
         <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-4">
            <div className="md:flex">

                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{todo.title}</div>
                    <p className="mt-2 text-gray-500">{todo.description}</p>
                    <p>Status: <span className={`text-base ${todo.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{todo.status}</span></p>
                    <div className="flex mt-4">
                        <TodoStatusUpdate todo={todo} />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleUpdateClick}>Update</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleRemoveClick}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
        {isEditing && (
                <UpdateTodo
                    todo={todo}
                    onClose={() => setIsEditing(false)} 
                    register={register}
                    handleSubmit={handleSubmit}
                />
            )}
            
            {isRemoving && (
                <RemoveTodo
                    todo={todo}
                    onClose={() => setIsRemoving(false)} 
                />
            )}
        </>
    )
}

